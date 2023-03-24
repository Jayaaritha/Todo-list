package QueueJava;

import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.Objects;

public class PriorityQueue<E> implements Queue<E>{

	private E[] myElements;                                                                    
	private int lengthOfTheQueue;
	
	 @SuppressWarnings("unchecked")
	public PriorityQueue() {
	        myElements = (E[]) new Comparable[0]; // initialize the array with a default size
	        this.lengthOfTheQueue = 0;
	    }

	
	public boolean add(E elem) {
		return offer(elem);
	}

	
	public String toString() {
	    if (isEmpty() || contains(null)) {
	        return "[]";
	    } else {
	        StringBuilder sb = new StringBuilder("[");
	        if (lengthOfTheQueue > 0) {
	            sb.append(myElements[0]);
	            for (int i = 1; i < lengthOfTheQueue; i++) {
	                sb.append(", ");
	                sb.append(myElements[i]);
	            }
	        }
	        sb.append("]");
	        return sb.toString();
	    }
	}




	
	@Override
	public int size() {
		return this.lengthOfTheQueue;
	}

	@Override
	public boolean isEmpty() {
		if(this.lengthOfTheQueue ==0)
		{
			return true;
		}
		return false;
	}

	@Override
	public boolean contains(Object o) {	
		return indexOf(o) >= 0;
	}
    
    public int indexOf(Object o) {
        if (o != null) {
            final Object[] es = myElements;
            for (int i = 0, n = size(); i < n; i++)
                if (o.equals(es[i]))
                    return i;
        }
        return -1;
    }
    
    @Override
    public Iterator<E> iterator() {
        return new Iterator<E>() {
            private int currentIndex = 0;

            @Override
            public boolean hasNext() {
                return currentIndex < lengthOfTheQueue && myElements[currentIndex] != null;
            }

            @Override
            public E next() {
                return myElements[currentIndex++];
            }
        };
    }


	@Override
	public Object[] toArray() {
		// TODO Auto-generated method stub
		return  Arrays.copyOf(myElements, size());
	}

	@SuppressWarnings("unchecked")
	@Override
	public <T> T[] toArray(T[] a) {
		
		if(a.length<size())
		{
			for(int i=0; i<a.length; i++)
			{
				a[i]=null;
			}
		}
		else
		{
		for(int i=0; i<myElements.length; i++)
		{
			a[i]=(T) myElements[i];
		  }
		}
		return a;
	}

	@Override
	public boolean remove(Object o) {
		//System.out.println(o);
		int indexToRemove = -1;
		for (int i = 0; i < myElements.length; i++) {
		    if (myElements[i] == o) {
		        indexToRemove = i;
		        //System.out.println(o+"="+indexToRemove);
		        break;
		    }
		}

		if (indexToRemove != -1) {
		    for (int i = indexToRemove; i < myElements.length - 1; i++) {
		    	myElements[i] = myElements[i + 1];
		    }
		    myElements = Arrays.copyOf(myElements, myElements.length - 1);
		    lengthOfTheQueue=myElements.length;
		   //System.out.println(size());
		}

		return false;
	}

	@Override
	public boolean containsAll(Collection<?> c) {
		//System.out.println(c);
		//System.out.println(toString());
		for (int i=0; i<myElements.length; i++)
		{
            if (!contains(myElements[i]))
                return false;
		}
        return true;
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean addAll(Collection<? extends E> c) {
		if (c == null)
            throw new NullPointerException();
		    boolean modified = false;
	        E[] ar = (E[]) c.toArray();
	       // System.out.println(ar.toString());
	        for(int i=0; i<ar.length; i++)
	        {
	        		add(ar[i]);
	        		modified=true;
	        	
	        }
		    return modified;
	}


	@Override
	public boolean retainAll(Collection<?> c) {
		if (c == null)
            throw new NullPointerException();
		else
		{
			Object[] a = c.toArray();
			for(int i=0; i<a.length; i++)
			{
				if(contains(a[i]))
				{
					return true;
				}
			}
		}
		return false;
	}

	@Override
	public void clear() {
		lengthOfTheQueue = 0;
		 Arrays.fill(myElements, null);
	}

	@Override
	public boolean offer(E e) {
		myElements = Arrays.copyOf(myElements, lengthOfTheQueue+1);
		myElements[lengthOfTheQueue] = e;
		lengthOfTheQueue = lengthOfTheQueue+1;
		Arrays.sort(myElements);
		return true;
	}

	@Override
	public E remove() {
		if(myElements.length == 0)
		{
			 throw new NoSuchElementException();
		}
		else
		{
		  E element = myElements[0];
		    myElements = Arrays.copyOfRange(myElements, 1, lengthOfTheQueue);
		    return element;
		}
	}

	@Override
	public E poll() {
		if(myElements.length == 0)
		{
			return null;
		}
		else
		{
		  E element = myElements[0];
		    myElements = Arrays.copyOfRange(myElements, 1, lengthOfTheQueue);
		    return element;
		}
		
	}

	@Override
	public E element() {
		// TODO Auto-generated method stub
		return myElements[0];
	}

	@Override
	public E peek() {
		// TODO Auto-generated method stub
		return myElements[0];
	}


	
	@Override
	public boolean removeAll(Collection<?> c) {
	    Objects.requireNonNull(c);
	    boolean modified = false;
        Object[] ar = c.toArray();
        //System.out.println(ar.toString());
        for(int i=0; i<ar.length; i++)
        {
        	//System.out.println(ar[i]+"="+contains(ar[i]));
        	if(contains(ar[i]))
        	{
        		//System.out.println(ar[i]);
        		remove(ar[i]);
        		modified=true;
        	}
        }
	    return modified;
	}


}
