import CardFeature from '@/components/shared/cardFeature'
import React from 'react'

const Upcoming = () => {
  return (
    <div className="p-6 pb-20 flex flex-col gap-7 bg-base-200 mt-10 border-y py-20">
      <span className="font-semibold text-[36px]">UPCOMING EVENTS</span>
      <div className="flex flex-wrap gap-4">
    <CardFeature img="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" title="Event Title" desc="Description of the event..." eventDate="DD/MM/YY" />
      <CardFeature img="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" title="Event Title" desc="Description of the event..." eventDate="DD/MM/YY" />
      <CardFeature img="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" title="Event Title" desc="Description of the event..." eventDate="DD/MM/YY" />
      <CardFeature img="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" title="Event Title" desc="Description of the event..." eventDate="DD/MM/YY" />
      </div>
    </div>
  )
}

export default Upcoming
