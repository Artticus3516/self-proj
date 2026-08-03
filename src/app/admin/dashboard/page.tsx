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
    .eq('user_id', user.id)
    .single()

  if (roleError || roleData?.role !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="rounded-md bg-red-50 p-6 w-full max-w-md shadow-sm border border-red-100">
          <h3 className="text-lg font-medium text-red-800">Access Denied</h3>
          <p className="mt-2 text-sm text-red-700">
            You do not have the required admin permissions to view this page.
          </p>
          <div className="mt-6">
            <Link 
              href="/admin/login" 
              className="inline-flex items-center justify-center rounded-md bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Leads Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Leads</h2>
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
              <ul role="list" className="divide-y divide-gray-100">
                {leads?.length === 0 || !leads ? (
                  <li className="p-4 text-sm text-gray-500">No leads found.</li>
                ) : (
                  leads.map((lead) => (
                    <li key={lead.id} className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {lead.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">{lead.email}</p>
                        <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Blog Management</h2>
            <BlogPostForm />
          </div>
        </div>
      </div>
    </div>
  )
}
