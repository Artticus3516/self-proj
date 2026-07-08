export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          title: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          created_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          created_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          created_at?: string
        }
        Relationships: []
      }
      traffic_logs: {
        Row: {
          id: string
          path: string
          timestamp: string
          user_agent: string
          consent_granted: boolean
        }
        Insert: {
          id?: string
          path: string
          timestamp?: string
          user_agent: string
          consent_granted: boolean
        }
        Update: {
          id?: string
          path?: string
          timestamp?: string
          user_agent?: string
          consent_granted?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
