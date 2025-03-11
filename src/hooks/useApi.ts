
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Mocked API hooks for UI demo

// Generic GET hook with dummy data
export const useFetch = <T>(url: string, queryKey: string[]) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Return dummy successful response
  return {
    data: undefined as unknown as T,
    isLoading: false,
    error: null,
    refetch: () => {
      console.log('Mock refetch for:', url, queryKey);
      return Promise.resolve();
    }
  };
};

// Generic POST hook with dummy implementation
export const useCreate = <T, U>(url: string, queryKey: string[]) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  return {
    mutate: (data: T) => {
      console.log('Mock create:', url, data);
      toast({
        title: 'Success',
        description: 'Operation completed successfully',
      });
    },
    mutateAsync: async (data: T): Promise<U> => {
      console.log('Mock create async:', url, data);
      toast({
        title: 'Success',
        description: 'Operation completed successfully',
      });
      return {} as U;
    },
    isLoading,
    isSuccess: false,
    isError: false,
    error: null
  };
};

// Generic PUT hook with dummy implementation
export const useUpdate = <T, U>(baseUrl: string, queryKey: string[]) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  return {
    mutate: ({ id, data }: { id: string; data: T }) => {
      console.log('Mock update:', `${baseUrl}/${id}`, data);
      toast({
        title: 'Success',
        description: 'Update completed successfully',
      });
    },
    mutateAsync: async ({ id, data }: { id: string; data: T }): Promise<U> => {
      console.log('Mock update async:', `${baseUrl}/${id}`, data);
      toast({
        title: 'Success',
        description: 'Update completed successfully',
      });
      return {} as U;
    },
    isLoading,
    isSuccess: false,
    isError: false,
    error: null
  };
};

// Generic DELETE hook with dummy implementation
export const useDelete = (baseUrl: string, queryKey: string[]) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  return {
    mutate: (id: string) => {
      console.log('Mock delete:', `${baseUrl}/${id}`);
      toast({
        title: 'Success',
        description: 'Item deleted successfully',
      });
    },
    mutateAsync: async (id: string): Promise<void> => {
      console.log('Mock delete async:', `${baseUrl}/${id}`);
      toast({
        title: 'Success',
        description: 'Item deleted successfully',
      });
    },
    isLoading,
    isSuccess: false,
    isError: false,
    error: null
  };
};
