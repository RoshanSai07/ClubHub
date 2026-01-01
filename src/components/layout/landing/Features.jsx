import React from "react";
import CardNoImg from "../../shared/cardNoImg";
import {
  DiscoverIcon,
  SuggestionsIcon,
  ToolsIcon,
  NotificationsIcon,
} from "../../logos/googleIcons";

const FeaturesL = () => {
  return (
    <section className="w-full px-10 mt-16">
      <span className="block  font-semibold text-3xl mb-5">
        FEATURES OVERVIEW
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardNoImg
          title="Event Discovery"
          pText="Browse all campus events in one place and find what matters to you"
          color="blue"
        >
          <DiscoverIcon />
        </CardNoImg>

        <CardNoImg
          title="Smart Suggestions"
          pText="Stay informed with reminders and important updates"
          color="green"
        >
          <SuggestionsIcon />
        </CardNoImg>

        <CardNoImg
          title="Club Tools"
          pText="Create events, manage participation, and track engagement easily"
          color="yellow"
        >
          <ToolsIcon />
        </CardNoImg>

        <CardNoImg
          title="Notifications"
          pText="Receive event recommendations based on your interests and schedule"
          color="red"
        >
          <NotificationsIcon />
        </CardNoImg>
      </div>
    </section>
  );
};

export default FeaturesL;
