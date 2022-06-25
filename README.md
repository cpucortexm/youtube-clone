# Youtube Clone Requirements

Will have

- a homepage
  lists all the most recent videos, in reverse chronological order until the site grows and we’ll introduce an algorithm
- a subscriptions page
  just for site logged in users, will list all videos of channels you’re subscribed to
- a channel page
  lists the videos of a user
- a single video page
  this is shown when a video is clicked, plays the video and hosts the comments

1. When a video page is opened, increment the views.
2. Count a video every time the page is loaded, regardless if we’ve already seen the video and display this count, like YouTube does.
3. Logged in users can subscribe to a channel, and unsubscribe.
4. Each channel will have a count of subscribers.
5. Videos from channels, a user is subscribed to will be visible in reverse chronological order in their subscriptions page.
6. Let people upload videos to the platform. The user will set a title for the video.

## URL structure

- Homepage: `/`
- Subscriptions page: `/subscriptions` (not same as the YT one, but close
- Channel page: `/channel/<USERNAME>`
- Single video page: `/video/<ID>`
