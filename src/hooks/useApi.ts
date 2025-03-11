
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

// Helper to get the auth token
const getAuthToken = () => localStorage.getItem('auth_token') || '';

// Generic GET hook
export const useFetch = <T>(url: string, queryKey: string[]) => {
  const { toast } = useToast();
  
  return useQuery({
    queryKey,
    queryFn: async (): Promise<T> => {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch data');
      }
      
      return response.json();
    },
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: error.message || 'Failed to fetch data',
          variant: 'destructive',
        });
      },
    },
  });
};

// Generic POST hook
export const useCreate = <T, U>(url: string, queryKey: string[]) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const mutation = useMutation({
    mutationFn: async (data: T): Promise<U> => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`,
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Operation failed');
        }
        
        return response.json();
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: 'Success',
        description: 'Operation completed successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Operation failed',
        variant: 'destructive',
      });
    },
  });
  
  return { ...mutation, isLoading };
};

// Generic PUT hook
export const useUpdate = <T, U>(baseUrl: string, queryKey: string[]) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: T }): Promise<U> => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`,
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Update failed');
        }
        
        return response.json();
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: 'Success',
        description: 'Update completed successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Update failed',
        variant: 'destructive',
      });
    },
  });
  
  return { ...mutation, isLoading };
};

// Generic DELETE hook
export const useDelete = (baseUrl: string, queryKey: string[]) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const mutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
          },
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Delete failed');
        }
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: 'Success',
        description: 'Item deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Delete failed',
        variant: 'destructive',
      });
    },
  });
  
  return { ...mutation, isLoading };
};
