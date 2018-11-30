# timetracker_server

### Description ###

	Enables setup of races of any kind for everybody, tracking and real-time visualization of runtimes via a mobile web/application.


### Which Problem will it solve? (Why & Motivation) ###

	Time Tracking Systems for races of any kind are expensive - especially for small races the effort for an state-of-the-art time tracking system in terms of cost/time is to high. So the coordinators of a race struggle with to provide a reliable and easy to use time tracking system and so they often use unreliable, unsatisfying solutions such a stop-watches (App or even physical). They need to track all runs of all participants manually and at the end of the race somebody needs to process the data and calculate the ranking list. This is often time consuming and error prone.


### Who has this Problem? (Stakeholder) ###

	Coordinators/Organizers of races of any kind. 
	Especially the "Mad East Enduro"-Races missing an sophisticated time tracking system for its participants. This is also the core motivation for this project.


### What are the features and characteristics of the system? (What) ###

	Open Source?!

	Track start and finish time of race participants via a web-application (browser or dedicated app).
		- online & offline capabilities
		- after or before pressing start/finish-button stage provider need to enter the race participant number.
		- Capability to change the number afterwards in case of wrong input
		- Visualization of started participant numbers. Track stop time with a single click/swipe (?)

	Browser based visualization of real-time race information such as runtimes of participants.

	Admin-Page for setting up races:
		- Setup page for race details
		- Registration page for potential participants OR reuse solution from 2018
			- Enable/disable participants (e.g. if payment received)
		
	Provide hotspot devices for automated time stamp providers and extensions.
		- LoRaWan to connect hotspots
		- All tracking application devices holding all race information -> synchronization/GUN-DB/Blockchain

	Extendible for physical time stamp providers such as a gate with physical bars. 
		- provide bar-gate devices with connection to app

	Extendible for contactless time stamp providers such as RFID/NFC/etc.
		- provide contactless gate devices with connection to app

	Blockchain based storage of results (?)


### What is the Minimum Viable Product Version of the System (MVP) ###

	MVP means the minimal version of the system which is fully usable for the core use case.

	Having an easy to use Interface to track race times. To be more specific:
		- having an interface for start a time series for a particular participant
		- having an interface for end a time series for a particular participant
		- calculation scheme for summarizing the race durations per participant
		- having an interface to visualize the results
		- having an option to edit the results


### How can the system be promoted? ###

	Developer-Blog: Document the way of developing from scratch:

		Part I
		- idea
		- approach, timeline, milestones
		- toolchain
		- coding experience & 1st. results
		- approach: refined -> decision how to proceed

		Part II
		- from code to first test
		- deployment
		- results

		Part III
		- Real-life test @ Mad East Enduro 2019

		1. On Steemit.com
		2. On Facebook -> with link to Steemit
		3. Mountainbike.net -> Promotion for Mad East Enduro 2019
		4. Direct contact:
			- MadEast & Massive SnowPark Crew
			- esp. David Lippmann
			- esp. "Vogtländer Derryk"


### How can the system be monetized? ###

	No deep thoughts on that so far.
	No research about other solution so far.
	The system should be free for use for certain groups.
	The system should be open source for everybody.


### Timeline & Milestones ###

	December 2018 ** this is the next logical and foreseable step, all other might change while moving on **
	- Architecture
	- Dev-System setup: Visual Studion Code + JS + Plugins
	- Start with node.js & javascript
	- Prepare documentation
	- Review by Markus & Andre
	- Redefine plan & setup next sprint


	Januar 2019
	- Basic architecture set:
		- central node.js server
		- SocketIO communication
		- json data exchange format (light API)
		- GUN-DB as Database backend (? - research necessary)
		- Webpage which can interact with server via API
		- Interface idea for external time stamp providers
	- Redefine plan & setup next sprint


	Februar 2019
	- Start&Finish-Stage prototype:
		- minimal stage setup: name of stage, name(s) of timetracker, Start or Finish-Line
		- Start a race & input start number
		- Finish a race & input start number	
	- Redefine plan & setup next sprint
	- 1st Report on the web


	March 2019
	** Announcement of Mad East Enduro 2019 including timetracker, open registration for users **
	- Testable prototype V1.0 - simple start & finish
	- Test run "Dry"
	- Test run in the field (Hermsdorf Main Stage)
	- Design & Architecture review and refine
	- Code improvements
	- Redefine plan & setup next sprint


	April 2019
	- Testable prototype V2.0 - advanced finish: click on started racer
	- Test on all stages (especially mobile reception)
		- Offline capability in Webpage (? - research necessary)
	- Code improvmements
	- Redefine plan & setup next sprint


	Mai 2019
	- Merge registration DB with timetracker DB
	- Simple Admin-Page for setting up races: stages
	- Simple Visualization-Page for showing actual race progress
	- Redefine plan & setup next sprint


	June 2019 
	- Use it on Mad East Enduro 2019!
	- Have a display on "Fisch's Hütte" showing actual results
	- Have a display on mainstage @ Ritterstall showing actual results
	- Decision: move on or finish.
