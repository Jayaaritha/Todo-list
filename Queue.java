package QueueJava;

import java.util.Collection;

@SuppressWarnings("rawtypes")
public interface Queue<E> extends Collection<E>{
    public boolean add(E e);
    public boolean offer(E e);
    public E remove();
    public E poll();
    public E element();
    public E peek();
	
}
