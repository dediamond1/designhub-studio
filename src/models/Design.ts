
export interface Design {
  id: string;
  name: string;
  description: string;
  userId: string;
  userName: string;
  imageUrl: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface DesignInput {
  name: string;
  description: string;
  userId: string;
  userName: string;
  imageUrl: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
}
