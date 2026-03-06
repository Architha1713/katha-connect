export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      beneficiaries: {
        Row: {
          age: number | null
          assigned_volunteer_id: string | null
          created_at: string
          id: string
          name: string
          notes: string | null
          organization_id: string
          status: string
          support_type: string | null
          type: string
          updated_at: string
        }
        Insert: {
          age?: number | null
          assigned_volunteer_id?: string | null
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          organization_id: string
          status?: string
          support_type?: string | null
          type?: string
          updated_at?: string
        }
        Update: {
          age?: number | null
          assigned_volunteer_id?: string | null
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          organization_id?: string
          status?: string
          support_type?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "beneficiaries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      corporate_employees: {
        Row: {
          admin_user_id: string | null
          company_name: string
          created_at: string
          department: string | null
          id: string
          user_id: string
        }
        Insert: {
          admin_user_id?: string | null
          company_name: string
          created_at?: string
          department?: string | null
          id?: string
          user_id: string
        }
        Update: {
          admin_user_id?: string | null
          company_name?: string
          created_at?: string
          department?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      csr_reports: {
        Row: {
          admin_user_id: string
          beneficiaries_helped: number | null
          company_name: string
          created_at: string
          id: string
          report_period: string | null
          summary: string | null
          total_employees_participated: number | null
          total_hours: number | null
        }
        Insert: {
          admin_user_id: string
          beneficiaries_helped?: number | null
          company_name: string
          created_at?: string
          id?: string
          report_period?: string | null
          summary?: string | null
          total_employees_participated?: number | null
          total_hours?: number | null
        }
        Update: {
          admin_user_id?: string
          beneficiaries_helped?: number | null
          company_name?: string
          created_at?: string
          id?: string
          report_period?: string | null
          summary?: string | null
          total_employees_participated?: number | null
          total_hours?: number | null
        }
        Relationships: []
      }
      impact_points: {
        Row: {
          created_at: string
          id: string
          points: number
          reason: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          points?: number
          reason?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          points?: number
          reason?: string | null
          user_id?: string
        }
        Relationships: []
      }
      mission_assignments: {
        Row: {
          assigned_at: string
          id: string
          mission_id: string
          status: string
          volunteer_id: string
        }
        Insert: {
          assigned_at?: string
          id?: string
          mission_id: string
          status?: string
          volunteer_id: string
        }
        Update: {
          assigned_at?: string
          id?: string
          mission_id?: string
          status?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_assignments_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "volunteer_missions"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string | null
          related_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          related_id?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          related_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          admin_user_id: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          logo_url: string | null
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          admin_user_id: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          name: string
          type?: string
          updated_at?: string
        }
        Update: {
          admin_user_id?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          causes: string[] | null
          created_at: string
          full_name: string
          id: string
          interests: string[] | null
          is_active: boolean | null
          languages: string[] | null
          location: string | null
          phone: string | null
          skills: string[] | null
          updated_at: string
          user_id: string
          weekly_availability: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          causes?: string[] | null
          created_at?: string
          full_name?: string
          id?: string
          interests?: string[] | null
          is_active?: boolean | null
          languages?: string[] | null
          location?: string | null
          phone?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id: string
          weekly_availability?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          causes?: string[] | null
          created_at?: string
          full_name?: string
          id?: string
          interests?: string[] | null
          is_active?: boolean | null
          languages?: string[] | null
          location?: string | null
          phone?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id?: string
          weekly_availability?: number | null
        }
        Relationships: []
      }
      stories: {
        Row: {
          author_id: string
          beneficiary_id: string | null
          content: string | null
          created_at: string
          id: string
          is_private: boolean | null
          media_type: string | null
          media_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          beneficiary_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          is_private?: boolean | null
          media_type?: string | null
          media_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          beneficiary_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          is_private?: boolean | null
          media_type?: string | null
          media_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stories_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      volunteer_missions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_urgent: boolean | null
          location: string | null
          max_volunteers: number | null
          organization_id: string
          skills_needed: string[] | null
          status: string
          time_commitment: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_urgent?: boolean | null
          location?: string | null
          max_volunteers?: number | null
          organization_id: string
          skills_needed?: string[] | null
          status?: string
          time_commitment?: string | null
          title: string
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_urgent?: boolean | null
          location?: string | null
          max_volunteers?: number | null
          organization_id?: string
          skills_needed?: string[] | null
          status?: string
          time_commitment?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_missions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_sessions: {
        Row: {
          beneficiary_id: string | null
          created_at: string
          hours: number
          id: string
          mission_id: string | null
          notes: string | null
          session_date: string
          volunteer_id: string
        }
        Insert: {
          beneficiary_id?: string | null
          created_at?: string
          hours?: number
          id?: string
          mission_id?: string | null
          notes?: string | null
          session_date?: string
          volunteer_id: string
        }
        Update: {
          beneficiary_id?: string | null
          created_at?: string
          hours?: number
          id?: string
          mission_id?: string | null
          notes?: string | null
          session_date?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_sessions_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_sessions_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "volunteer_missions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "volunteer"
        | "organization"
        | "corporate_admin"
        | "corporate_employee"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "volunteer",
        "organization",
        "corporate_admin",
        "corporate_employee",
      ],
    },
  },
} as const
