import HeaderSection from '@/components/layout/Settings/HeaderSection'
import ProfileInfo from '@/components/layout/SettingsC/ProfileInfo'
import HiringManagementSection from '@/components/layout/SettingsC/HiringManagementSection' 
import React from 'react'
import PreferencesSection from '@/components/layout/SettingsC/Preferences'

const Settings = () => {
  return (
    <div className="bg-gray-50 min-w-fit">
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50">
      <HeaderSection />
      <ProfileInfo />
      <PreferencesSection/>
      <HiringManagementSection />
    </div>
    </div>
  )
}

export default Settings
