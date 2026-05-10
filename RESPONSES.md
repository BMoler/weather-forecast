### Walk us through your decisions

1. `What did you prioritize and why?`

- I wanted to make sure the table highlights were shown for fast and informative decisions.
- The active times (8am - 6pm) and forecast thresholds were important for making a decision and were what the user was asking for.
- I also decided to prioritize the API services and interfaces for proper data retrieval and display.
- I did this because the app is built on data retrieval and being able to display that data is integral.
- Having loading, error, and filled states are important so the app doesn't behave unexpectedly.
- Having proper types and interfaces is very important for building an maintaining an app in the future.

2. `What did you leave out?`

- I left out an indicator for the day to give a go/no-go decision.
- I figured I would leave this out to give the user the option to decide on their own.
- I also decided to leave out drill-down capabilities and an all-in-one day overview for time purposes. Those could be later features down the line.
- I left out user input which is important to an app like this so users can adjust what thresholds they're looking for or what time frame they want to see.

3. `If Tara were sitting next to you, what would you ask her before building the next version?`

- I would ask her if there are any other weather conditions worth adding. (Temp, Humidity, etc.)
- I would also ask her if this version worked for her. She might want to see it in a different format unique to her, to better help her make a decision.

### How would you evolve this tool?

1. `How do you prioritize making new decisions`

- First I would estimate the work needed to complete a feature along with the need for that feature. This gives me a very good idea of what to do next.
- I can then create a backlog of features and re-priorirtize given anything new comes up.
- If I were to build the features in order:
  - I would build the functionality for more demo sites with a search function or map (extending the functionality and usability of the app)
  - Build in historical weather patterns because it's important to the decision making process.
  - Build a mobile version using media queries to size down the view to a mobile version. Or use something like Ionic/Capacitor if native mobile functionality is required so I can re-use web framework code directly on a mobile device.
