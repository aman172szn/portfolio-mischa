export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string;
          role: 'owner' | 'editor';
          user_id: string;
        };
        Insert: {
          created_at?: string;
          role?: 'owner' | 'editor';
          user_id: string;
        };
        Update: {
          created_at?: string;
          role?: 'owner' | 'editor';
          user_id?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          city: string | null;
          created_at: string;
          description_de: string | null;
          description_en: string | null;
          event_date: string | null;
          event_title_de: string | null;
          event_title_en: string | null;
          external_link: string | null;
          featured: boolean;
          id: string;
          status: 'draft' | 'published' | 'archived';
          type_de: string | null;
          type_en: string | null;
          updated_at: string;
          venue: string | null;
          work_id: string | null;
        };
        Insert: Partial<Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at' | 'updated_at'>> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['events']['Row']>;
        Relationships: [];
      };
      news: {
        Row: {
          content_de: string | null;
          content_en: string | null;
          created_at: string;
          excerpt_de: string | null;
          excerpt_en: string | null;
          featured: boolean;
          id: string;
          image_path: string | null;
          publication_date: string | null;
          slug: string;
          status: 'draft' | 'published' | 'archived';
          title_de: string;
          title_en: string | null;
          updated_at: string;
        };
        Insert: Partial<Omit<Database['public']['Tables']['news']['Row'], 'id' | 'created_at' | 'updated_at'>> & {
          slug: string;
          title_de: string;
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['news']['Row']>;
        Relationships: [];
      };
      site_settings: {
        Row: {
          about_image_path: string | null;
          default_language: 'de' | 'en';
          email: string | null;
          hero_image_path: string | null;
          id: boolean;
          name: string;
          social_links: Json;
          title_de: string;
          title_en: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['site_settings']['Row']>;
        Update: Partial<Database['public']['Tables']['site_settings']['Row']>;
        Relationships: [];
      };
      works: {
        Row: {
          audio_path: string | null;
          category: string | null;
          cover_image_path: string | null;
          created_at: string;
          description_de: string | null;
          description_en: string | null;
          duration: string | null;
          featured: boolean;
          id: string;
          instrumentation_de: string | null;
          instrumentation_en: string | null;
          score_pdf_path: string | null;
          slug: string;
          sort_order: number;
          status: 'draft' | 'published' | 'archived';
          title_de: string;
          title_en: string | null;
          updated_at: string;
          year: number | null;
        };
        Insert: Partial<Omit<Database['public']['Tables']['works']['Row'], 'id' | 'created_at' | 'updated_at'>> & {
          slug: string;
          title_de: string;
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['works']['Row']>;
        Relationships: [];
      };
      work_media: {
        Row: {
          created_at: string;
          duration: string | null;
          id: string;
          is_primary: boolean;
          media_type: 'audio' | 'score' | 'photo';
          sort_order: number;
          status: 'draft' | 'published' | 'archived';
          storage_bucket: 'audio' | 'scores' | 'photos';
          storage_path: string;
          title_de: string | null;
          title_en: string | null;
          updated_at: string;
          work_id: string;
        };
        Insert: Partial<Omit<Database['public']['Tables']['work_media']['Row'], 'id' | 'created_at' | 'updated_at'>> & {
          storage_bucket: 'audio' | 'scores' | 'photos';
          storage_path: string;
          work_id: string;
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['work_media']['Row']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      set_updated_at: {
        Args: Record<string, never>;
        Returns: unknown;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
