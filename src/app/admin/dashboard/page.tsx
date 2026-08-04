import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BlogPostForm } from './blog-form'
// Opt-out of Cache Components for this dynamic admin route
export const instant = false;
export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Check user role
  const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id).single()
    console.log(roleData)
    console.log(roleError)
    if (roleError || roleData?.role !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="rounded-xl bg-card p-6 w-full max-w-md shadow-sm border border-destructive/30 text-card-foreground">
          <h3 className="text-lg font-medium text-destructive">Access Denied</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            You do not have the required admin permissions to view this page.
          </p>
          <div className="mt-6">
            <Link 
              href="/admin/login" 
              className="inline-flex items-center justify-center rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-ring transition-colors shadow-sm"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Fetch leads
  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Leads Section */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Leads</h2>
            <div className="bg-card text-card-foreground shadow-sm border border-border sm:rounded-xl">
              <ul role="list" className="divide-y divide-border">
                {leads?.length === 0 || !leads ? (
                  <li className="p-4 text-sm text-muted-foreground">No leads found.</li>
                ) : (
                  leads.map((lead) => (
                    <li key={lead.id} className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold leading-6 text-foreground">
                            {lead.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                        <p className="mt-2 text-sm text-foreground/90 whitespace-pre-wrap">
                          {lead.message}
                        </p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          {/* Blog Post Form Section */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Blog Management</h2>
            <BlogPostForm />
          </div>
        </div>
      </div>
    </div>
  )
}
