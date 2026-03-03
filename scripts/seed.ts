import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'aknexis'

async function main() {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB_NAME })
  console.log('Connected.')

  // Import models
  const { User } = await import('../lib/db/models/User.model')
  const { Lead } = await import('../lib/db/models/Lead.model')
  const { Client } = await import('../lib/db/models/Client.model')
  const { Project } = await import('../lib/db/models/Project.model')

  const bcrypt = await import('bcryptjs')

  // Clear existing seed data
  await User.deleteMany({ email: { $in: ['admin@aknexis.io', 'manager@aknexis.io', 'staff@aknexis.io'] } })

  // Seed users
  const adminHash = await bcrypt.hash('Admin@123456', 12)
  const staffHash = await bcrypt.hash('Staff@123456', 12)

  const [admin, manager, staff] = await User.insertMany([
    { firstName: 'Admin', lastName: 'User', email: 'admin@aknexis.io', passwordHash: adminHash, role: 'admin' },
    { firstName: 'Manager', lastName: 'User', email: 'manager@aknexis.io', passwordHash: staffHash, role: 'manager' },
    { firstName: 'Staff', lastName: 'Member', email: 'staff@aknexis.io', passwordHash: staffHash, role: 'staff' },
  ])
  console.log('Users seeded:', [admin.email, manager.email, staff.email].join(', '))

  // Seed leads
  const leads = await Lead.insertMany([
    { fullName: 'Arjun Sharma', email: 'arjun@example.com', phone: '+91 9876543210', companyName: 'TechStart India', serviceInterest: 'web_software_development', message: 'We need a web application for our startup. Looking for a reliable tech partner.', status: 'new', source: 'website_contact' },
    { fullName: 'Priya Menon', email: 'priya@retail.in', companyName: 'Priya Retail', serviceInterest: 'legal_registrations', message: 'Need GST registration and company incorporation for my retail business in Chennai.', status: 'contacted', source: 'website_contact' },
    { fullName: 'Rahul Krishnan', email: 'rahul@consulting.co', companyName: 'RK Consulting', serviceInterest: 'branding_identity', message: 'Looking for a complete brand identity package for my consulting firm.', status: 'qualified', source: 'website_contact' },
    { fullName: 'Deepa Nair', email: 'deepa@healthplus.in', serviceInterest: 'seo_marketing', message: 'Need SEO and digital marketing for our healthcare clinic. We want more patients to find us online.', status: 'proposal_sent', source: 'website_contact' },
    { fullName: 'Suresh Babu', email: 'suresh@foods.in', companyName: 'Suresh Foods', serviceInterest: 'platform_setup', message: 'Want to set up an e-commerce store for our food products with payment gateway integration.', status: 'new', source: 'website_contact' },
  ])
  console.log(`Seeded ${leads.length} leads.`)

  // Seed clients
  const clients = await Client.insertMany([
    {
      companyName: 'NexaTech Solutions',
      industry: 'Technology',
      primaryContact: { fullName: 'Karthik Rajan', email: 'karthik@nexatech.in', phone: '+91 9988776655' },
      status: 'active',
      clientSince: new Date('2024-06-01'),
      accountManager: manager._id,
      originLeadId: leads[0]._id,
    },
    {
      companyName: 'Bloom Retail Group',
      industry: 'Retail',
      primaryContact: { fullName: 'Anita Reddy', email: 'anita@bloomretail.in', phone: '+91 9876543211' },
      status: 'active',
      clientSince: new Date('2024-08-15'),
      accountManager: manager._id,
    },
  ])
  console.log(`Seeded ${clients.length} clients.`)

  // Seed projects
  await Project.insertMany([
    {
      title: 'NexaTech Corporate Website',
      description: 'A full corporate website with service pages, blog, and contact integration.',
      clientId: clients[0]._id,
      type: 'software_engineering',
      status: 'active',
      priority: 'high',
      projectManager: manager._id,
      completionPercent: 65,
      targetEndDate: new Date('2025-03-30'),
    },
    {
      title: 'Bloom Retail E-Commerce Store',
      description: 'Shopify store setup with payment gateway and inventory management.',
      clientId: clients[1]._id,
      type: 'business_foundation',
      status: 'completed',
      priority: 'medium',
      projectManager: manager._id,
      completionPercent: 100,
      actualEndDate: new Date('2024-10-20'),
    },
  ])
  console.log('Seeded 2 projects.')

  console.log('\n✅ Seed complete.')
  console.log('\nCredentials:')
  console.log('  Admin:   admin@aknexis.io / Admin@123456')
  console.log('  Manager: manager@aknexis.io / Staff@123456')
  console.log('  Staff:   staff@aknexis.io / Staff@123456')

  await mongoose.disconnect()
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
