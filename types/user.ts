export interface User {
  id: number;
  email: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  birthday: string;
  phoneNumber: string;
  role: "CLIENT" | "TRAINER";
  subscription: "free" | "pro_client" | "pro_trainer";
  createdAt: Date;
  trainerCode?: string;
  imageId: number;
  isFirstLogin?: boolean;
  hasAcceptedTerms?: boolean;
  onboardingData?: {
    goal?: string;
    experience?: string;
    completedAt?: Date;
  };
}

export interface Client extends User {
  role: "CLIENT";
  trainerId?: string;
  goals?: string;
  lastTrainingDay?: Date;
  status: "active" | "inactive";
}

export interface Trainer extends User {
  role: "TRAINER";
  clientCount: number;
  rating?: number;
  reviewsCount?: number;
  experience?: number;
  location?: string;
  specialties?: string[];
  description?: string;
  certification?: string[];
  languages?: string[];
  availability?: string;
  pricingPlans?: PricingPlan[];
  reviews?: Review[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
}

export interface Review {
  id: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
}
