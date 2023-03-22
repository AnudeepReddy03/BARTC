import java.util.*;

import javax.print.event.PrintJobListener;
class some
{
    static int fact(int n)
    {
        if(n<=1)
            return 1;
        return n*fact(n-1);
    } 
    static List<Object> func(int[] a,int n)
    {
        List<Object> l = new ArrayList<>();
        for(int i=0;i<a.length;i++)
        {
            int x = 0,num=a[i],fin=0;
            while(num==x || fin<=60)
            {
                while (a[i]> 0) {
                    x+=fact(a[i] % 10);
                    a[i] = a[i] / 10;
                }
                fin++;
            }
            if(num==x)
                l.add(num);
            else
                l.add('F');   
        }
            return l;
    }
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine();
        String[] takes = line.split(" ");
        int[] arr = new int[takes.length];
        for(int i=0;i<arr.length;i++)
        {
            arr[i] = Integer.parseInt(takes[i]);
            int n = arr.length;
        }
        System.out.println(func(arr,n));
    }
}