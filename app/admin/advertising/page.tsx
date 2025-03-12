"use client"

import type React from "react"

import { useState } from "react"
import * as Tabs from "@radix-ui/react-tabs"

export default function AdvertisingPage() {
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const [toast, setToast] = useState<{
    title: string
    description: string
    status: "success" | "error" | "info"
  } | null>(null)

  const showToast = (title: string, description: string, status: "success" | "error" | "info") => {
    setToast({ title, description, status })
    setTimeout(() => setToast(null), 5000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showToast("Campaign submitted", "Your advertising campaign has been submitted for review.", "success")
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Advertising Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your advertising campaigns and view analytics</p>
        </div>

        <Tabs.Root value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <Tabs.Trigger
              value="dashboard"
              className="px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400"
            >
              Dashboard
            </Tabs.Trigger>
            <Tabs.Trigger
              value="create"
              className="px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400"
            >
              Create Campaign
            </Tabs.Trigger>
            <Tabs.Trigger
              value="active"
              className="px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400"
            >
              Active Campaigns
            </Tabs.Trigger>
            <Tabs.Trigger
              value="pricing"
              className="px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400"
            >
              Pricing
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Impressions</div>
                <div className="text-3xl font-bold mt-2">345,670</div>
                <div className="flex items-center mt-2 text-sm text-green-600 dark:text-green-400">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2.5L9.5 6L8.5 7L6.5 5L6.5 9.5L5.5 9.5L5.5 5L3.5 7L2.5 6L6 2.5Z" fill="currentColor" />
                  </svg>
                  23.36%
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Click-through Rate</div>
                <div className="text-3xl font-bold mt-2">2.57%</div>
                <div className="flex items-center mt-2 text-sm text-green-600 dark:text-green-400">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2.5L9.5 6L8.5 7L6.5 5L6.5 9.5L5.5 9.5L5.5 5L3.5 7L2.5 6L6 2.5Z" fill="currentColor" />
                  </svg>
                  0.31%
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</div>
                <div className="text-3xl font-bold mt-2">$5,670</div>
                <div className="flex items-center mt-2 text-sm text-green-600 dark:text-green-400">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2.5L9.5 6L8.5 7L6.5 5L6.5 9.5L5.5 9.5L5.5 5L3.5 7L2.5 6L6 2.5Z" fill="currentColor" />
                  </svg>
                  12.05%
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mt-6 mb-4">Recent Campaigns</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-2 text-left text-sm font-medium">Campaign</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Impressions</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Clicks</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">CTR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3">Summer Promotion</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-3">124,568</td>
                      <td className="px-4 py-3">3,245</td>
                      <td className="px-4 py-3">2.61%</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3">New User Discount</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-3">98,321</td>
                      <td className="px-4 py-3">2,876</td>
                      <td className="px-4 py-3">2.93%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Holiday Special</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          Ended
                        </span>
                      </td>
                      <td className="px-4 py-3">156,782</td>
                      <td className="px-4 py-3">4,532</td>
                      <td className="px-4 py-3">2.89%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="create">
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h3 className="text-xl font-medium mb-6">Create New Advertising Campaign</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="campaign-name">
                    Campaign Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="campaign-name"
                    type="text"
                    placeholder="Enter campaign name"
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="ad-format">
                    Ad Format <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="ad-format"
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-background"
                  >
                    <option value="">Select ad format</option>
                    <option value="banner">Banner (728x90)</option>
                    <option value="square">Square (300x250)</option>
                    <option value="skyscraper">Skyscraper (160x600)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="target-audience">
                    Target Audience <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="target-audience"
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-background"
                  >
                    <option value="">Select target audience</option>
                    <option value="all">All Users</option>
                    <option value="new">New Visitors</option>
                    <option value="returning">Returning Users</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="budget">
                    Budget <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="budget"
                    type="number"
                    placeholder="Enter budget in USD"
                    min={100}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-background"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="start-date">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="start-date"
                      type="date"
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="end-date">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="end-date"
                      type="date"
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-background"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="ad-creative">
                    Ad Creative
                  </label>
                  <input
                    id="ad-creative"
                    type="file"
                    accept="image/*"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="landing-page">
                    Landing Page URL
                  </label>
                  <input
                    id="landing-page"
                    type="url"
                    placeholder="https://example.com/landing-page"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="notes">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    placeholder="Any specific requirements or information"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-background"
                    rows={4}
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                    Submit Campaign
                  </button>
                </div>
              </form>
            </div>
          </Tabs.Content>

          <Tabs.Content value="active">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-2 text-left text-sm font-medium">Campaign</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Format</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Start Date</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">End Date</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Budget</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">Summer Promotion</td>
                    <td className="px-4 py-3">Banner</td>
                    <td className="px-4 py-3">Jun 1, 2023</td>
                    <td className="px-4 py-3">Aug 31, 2023</td>
                    <td className="px-4 py-3">$2,500</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                          Edit
                        </button>
                        <button className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                          Pause
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">New User Discount</td>
                    <td className="px-4 py-3">Square</td>
                    <td className="px-4 py-3">May 15, 2023</td>
                    <td className="px-4 py-3">Dec 31, 2023</td>
                    <td className="px-4 py-3">$5,000</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                          Edit
                        </button>
                        <button className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                          Pause
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tabs.Content>

          <Tabs.Content value="pricing">
            <div className="space-y-8">
              <p className="text-lg">
                Choose the right advertising package for your business needs. All plans include detailed analytics and
                reporting.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-4 text-center">
                    <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300">Basic</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <span className="text-3xl font-bold">$499</span>
                        <span className="text-sm">/month</span>
                      </div>
                      <p className="text-center text-gray-500 dark:text-gray-400">Perfect for small businesses</p>
                      <div className="space-y-2">
                        <p>✓ Banner ad placement</p>
                        <p>✓ 50,000 impressions</p>
                        <p>✓ Basic targeting</p>
                        <p>✓ Monthly reports</p>
                      </div>
                      <button className="w-full px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/20">
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-purple-500 p-4 text-center">
                    <h3 className="text-lg font-medium text-white">Premium</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <span className="text-3xl font-bold">$999</span>
                        <span className="text-sm">/month</span>
                      </div>
                      <p className="text-center text-gray-500 dark:text-gray-400">For growing businesses</p>
                      <div className="space-y-2">
                        <p>✓ Banner and square ad placements</p>
                        <p>✓ 150,000 impressions</p>
                        <p>✓ Advanced targeting</p>
                        <p>✓ Weekly reports</p>
                        <p>✓ A/B testing</p>
                      </div>
                      <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-purple-900 p-4 text-center">
                    <h3 className="text-lg font-medium text-white">Enterprise</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <span className="text-3xl font-bold">$2,499</span>
                        <span className="text-sm">/month</span>
                      </div>
                      <p className="text-center text-gray-500 dark:text-gray-400">For large organizations</p>
                      <div className="space-y-2">
                        <p>✓ All ad placements</p>
                        <p>✓ Unlimited impressions</p>
                        <p>✓ Premium targeting</p>
                        <p>✓ Real-time analytics</p>
                        <p>✓ Dedicated account manager</p>
                        <p>✓ Custom integrations</p>
                      </div>
                      <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                        Contact Sales
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 max-w-md p-4 rounded-md shadow-lg ${
            toast.status === "success" ? "bg-green-500" : toast.status === "error" ? "bg-red-500" : "bg-blue-500"
          } text-white`}
        >
          <h3 className="font-bold">{toast.title}</h3>
          <p>{toast.description}</p>
        </div>
      )}
    </div>
  )
}

