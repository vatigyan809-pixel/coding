#include<stdio.h>
int main(){
    int n,i;
    printf("enter the element");
    scanf("%d",&n);
 int a[20];
 for(i=0;i<n;i++)
 scanf("%d",&a[i]);
 printf("enter the array\n");
 int sum=0;
 for(i=0; i<n;i++)
 sum=sum+a[i];
 printf("%d",sum);
 return 0;

}