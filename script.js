 
"use strict";

// ---------- DOM ELEMENTS ----------
const $ = (selector) => document.querySelector(selector);

const taskList = $("#taskList");
const taskModal = $("#taskModal");
const taskForm = $("#taskForm");
const searchInput = $("#searchInput");
const priorityFilter = $("#priorityFilter");
const sortSelect = $("#sortSelect");
const emptyState = $("#emptyState");
const toast = $("#toast");

const STORAGE_KEY = "taskflow_tasks_v1";
const THEME_KEY = "taskflow_theme_v1";

let tasks = loadTasks();
let currentFilter = "all";
let currentCategory = null;
let editingId = null;
let toastTimer;

// ---------- STORAGE ----------
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(task =>
      task &&
      typeof task.id === "string" &&
      typeof task.title === "string"
    );
  } catch (error) {
    console.error("Could not load tasks:", error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error("Could not save tasks:", error);
    showToast("Could not save data. Check browser storage.");
    return false;
  }
}

// ---------- HELPERS ----------
function makeId() {
  if (typeof crypto !== "undefined" &&
      typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return Date.now().toString(36) +
    Math.random().toString(36).slice(2);
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function todayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(dateString) {
  if (!dateString) return "";

  const parts = dateString.split("-").map(Number);
  if (parts.length !== 3 || parts.some(n => !n)) return "";

  const date = new Date(parts[0], parts[1] - 1, parts[2]);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function getDueTimestamp(task) {
  if (!task.dueDate) return Infinity;

  const date = task.dueTime
    ? `${task.dueDate}T${task.dueTime}`
    : `${task.dueDate}T23:59`;

  const timestamp = new Date(date).getTime();
  return Number.isNaN(timestamp) ? Infinity : timestamp;
}

function isOverdue(task) {
  return Boolean(
    !task.completed &&
    task.dueDate &&
    getDueTimestamp(task) < Date.now()
  );
}

// ---------- DATE HEADER ----------
function updateDate() {
  $("#currentDate").textContent =
    new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
}

// ---------- DASHBOARD ----------
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const progress = total
    ? Math.round((completed / total) * 100)
    : 0;

  $("#totalTasks").textContent = total;
  $("#pendingTasks").textContent = pending;
  $("#completedTasks").textContent = completed;
  $("#progressPercent").textContent = `${progress}%`;
  $("#progressBar").style.width = `${progress}%`;
  $("#allCount").textContent = total;
}

// ---------- FILTERING & SORTING ----------
function getVisibleTasks() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedPriority = priorityFilter.value;
  const today = todayString();

  let result = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(query) ||
      (task.description || "").toLowerCase().includes(query) ||
      (task.category || "").toLowerCase().includes(query);

    const matchesPriority =
      selectedPriority === "all" ||
      task.priority === selectedPriority;

    let matchesView = true;

    if (currentFilter === "today") {
      matchesView = task.dueDate === today && !task.completed;
    } else if (currentFilter === "upcoming") {
      matchesView =
        Boolean(task.dueDate && task.dueDate > today) &&
        !task.completed;
    } else if (currentFilter === "completed") {
      matchesView = task.completed;
    }

    const matchesCategory =
      !currentCategory || task.category === currentCategory;

    return matchesSearch &&
      matchesPriority &&
      matchesView &&
      matchesCategory;
  });

  const sort = sortSelect.value;

  if (sort === "newest") {
    result.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sort === "oldest") {
    result.sort((a, b) => a.createdAt - b.createdAt);
  } else if (sort === "due") {
    result.sort((a, b) => getDueTimestamp(a) - getDueTimestamp(b));
  } else if (sort === "priority") {
    const rank = { High: 0, Medium: 1, Low: 2 };
    result.sort((a, b) =>
      (rank[a.priority] ?? 1) - (rank[b.priority] ?? 1)
    );
  } else if (sort === "az") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }

  return result;
}

// ---------- RENDER TASKS ----------
function renderTasks() {
  updateStats();

  const visibleTasks = getVisibleTasks();

  const titles = {
    all: "All Tasks",
    today: "Today's Tasks",
    upcoming: "Upcoming Tasks",
    completed: "Completed Tasks"
  };

  $("#sectionTitle").textContent =
    currentCategory || titles[currentFilter] || "All Tasks";

  $("#taskSubtitle").textContent =
    `${visibleTasks.length} task${visibleTasks.length === 1 ? "" : "s"} in this view`;

  taskList.replaceChildren();

  emptyState.hidden = visibleTasks.length !== 0;
  taskList.hidden = visibleTasks.length === 0;

  visibleTasks.forEach(task => {
    const item = document.createElement("article");
    item.className = `task-item${task.completed ? " is-completed" : ""}`;

    const priority = ["High", "Medium", "Low"].includes(task.priority)
      ? task.priority
      : "Medium";

    const category = ["Personal", "Work", "Study", "Shopping"]
      .includes(task.category)
      ? task.category
      : "Personal";

    const dueLabel = task.dueDate
      ? `${formatDate(task.dueDate)}${task.dueTime ? " · " + task.dueTime : ""}`
      : "";

    const dueClass = isOverdue(task) ? "tag due-overdue" : "tag";

    item.innerHTML = `
      <input
        class="task-check"
        type="checkbox"
        data-action="toggle"
        data-id="${escapeHTML(task.id)}"
        aria-label="Mark ${escapeHTML(task.title)} completed"
        ${task.completed ? "checked" : ""}
      >

      <div class="task-body">
        <div class="task-title">${escapeHTML(task.title)}</div>

        ${task.description ? `
          <p class="task-description">${escapeHTML(task.description)}</p>
        ` : ""}

        <div class="task-meta">
          <span class="tag">${escapeHTML(category)}</span>
          <span class="tag priority-${priority.toLowerCase()}">
            ${priority} Priority
          </span>
          ${dueLabel ? `
            <span class="${dueClass}">
              ${isOverdue(task) ? "Overdue · " : "Due · "}${escapeHTML(dueLabel)}
            </span>
          ` : ""}
        </div>
      </div>

      <div class="task-actions">
        <button class="icon-btn" data-action="edit"
          data-id="${escapeHTML(task.id)}"
          aria-label="Edit ${escapeHTML(task.title)}"
          title="Edit">✎</button>

        <button class="icon-btn delete-btn" data-action="delete"
          data-id="${escapeHTML(task.id)}"
          aria-label="Delete ${escapeHTML(task.title)}"
          title="Delete">×</button>
      </div>
    `;

    taskList.appendChild(item);
  });

  $("#visibleCount").textContent =
    `Showing ${visibleTasks.length} of ${tasks.length} tasks`;
}

// ---------- MODAL ----------
function openModal(task = null) {
  editingId = task ? task.id : null;
  taskForm.reset();

  $("#modalTitle").textContent =
    task ? "Edit Task" : "Create New Task";

  $("#saveTaskBtn").textContent =
    task ? "Update Task" : "Save Task";

  $("#taskTitle").value = task?.title || "";
  $("#taskDescription").value = task?.description || "";
  $("#taskCategory").value = task?.category || "Personal";
  $("#taskPriority").value = task?.priority || "Medium";
  $("#taskDueDate").value = task?.dueDate || "";
  $("#taskDueTime").value = task?.dueTime || "";

  taskModal.hidden = false;
  document.body.style.overflow = "hidden";
  $("#taskTitle").focus();
}

function closeModal() {
  taskModal.hidden = true;
  document.body.style.overflow = "";
  editingId = null;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const title = $("#taskTitle").value.trim();

  if (!title) {
    showToast("Please enter a task title.");
    $("#taskTitle").focus();
    return;
  }

  const existing = tasks.find(task => task.id === editingId);

  const taskData = {
    id: existing ? existing.id : makeId(),
    title,
    description: $("#taskDescription").value.trim(),
    category: $("#taskCategory").value,
    priority: $("#taskPriority").value,
    dueDate: $("#taskDueDate").value,
    dueTime: $("#taskDueTime").value,
    completed: existing ? existing.completed : false,
    createdAt: existing ? existing.createdAt : Date.now(),
    updatedAt: Date.now()
  };

  if (existing) {
    tasks = tasks.map(task =>
      task.id === editingId ? taskData : task
    );
  } else {
    tasks.unshift(taskData);
  }

  saveTasks();
  closeModal();
  renderTasks();

  showToast(existing ? "Task updated successfully!" : "Task added successfully!");
}

// ---------- COMPLETE / EDIT / DELETE ----------
taskList.addEventListener("change", event => {
  const control = event.target;

  if (!control.matches('[data-action="toggle"]')) return;

  const task = tasks.find(item => item.id === control.dataset.id);
  if (!task) return;

  task.completed = control.checked;
  task.updatedAt = Date.now();

  saveTasks();
  renderTasks();

  showToast(task.completed
    ? "Great job! Task completed."
    : "Task marked as pending.");
});

taskList.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const id = button.dataset.id;
  const action = button.dataset.action;
  const task = tasks.find(item => item.id === id);

  if (!task) return;

  if (action === "edit") {
    openModal(task);
  }

  if (action === "delete") {
    const confirmed = confirm(
      `Delete "${task.title}"? This cannot be undone.`
    );

    if (!confirmed) return;

    tasks = tasks.filter(item => item.id !== id);
    saveTasks();
    renderTasks();
    showToast("Task deleted.");
  }
});

// ---------- SIDEBAR NAVIGATION ----------
document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    currentCategory = null;

    updateActiveNavigation(button);
    renderTasks();
  });
});

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    currentCategory = button.dataset.category;
    currentFilter = "all";

    updateActiveNavigation(button);
    renderTasks();
  });
});

function updateActiveNavigation(selectedButton) {
  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.remove("active");
  });

  selectedButton.classList.add("active");
}

// ---------- SEARCH, FILTER & SORT ----------
searchInput.addEventListener("input", renderTasks);
priorityFilter.addEventListener("change", renderTasks);
sortSelect.addEventListener("change", renderTasks);

// ---------- MODAL BUTTONS ----------
$("#headerAddBtn").addEventListener("click", () => openModal());
$("#emptyAddBtn").addEventListener("click", () => openModal());
$("#closeModalBtn").addEventListener("click", closeModal);
$("#cancelBtn").addEventListener("click", closeModal);
taskForm.addEventListener("submit", handleFormSubmit);

taskModal.addEventListener("click", event => {
  if (event.target === taskModal) closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !taskModal.hidden) {
    closeModal();
  }
});

// ---------- CLEAR COMPLETED ----------
$("#clearCompletedBtn").addEventListener("click", () => {
  const completed = tasks.filter(task => task.completed).length;

  if (!completed) {
    showToast("No completed tasks to clear.");
    return;
  }

  if (!confirm(`Delete all ${completed} completed tasks?`)) return;

  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
  showToast("Completed tasks cleared.");
});

// ---------- DARK / LIGHT MODE ----------
function applyTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark", isDark);
  $("#themeIcon").textContent = isDark ? "☀" : "☾";
  $("#themeToggle").lastChild.textContent =
    isDark ? " Light Mode" : " Dark Mode";

  $("#themeToggle").setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
}

let savedTheme = "light";

try {
  savedTheme = localStorage.getItem(THEME_KEY) || "light";
} catch (error) {
  console.warn("Theme preference unavailable.");
}

applyTheme(savedTheme);

$("#themeToggle").addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark")
    ? "light"
    : "dark";

  applyTheme(nextTheme);

  try {
    localStorage.setItem(THEME_KEY, nextTheme);
  } catch (error) {
    console.warn("Could not save theme preference.");
  }
});

// ---------- EXPORT TASKS AS JSON ----------
$("#exportBtn").addEventListener("click", () => {
  if (!tasks.length) {
    showToast("No tasks available to export.");
    return;
  }

  const data = JSON.stringify(tasks, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `taskflow-backup-${todayString()}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  showToast("Task backup exported!");
});

// ---------- INITIALIZE ----------
updateDate();
renderTasks();
