# Brainstorming and Outline


## ---------- IDEA DUMP --------

Have a recommended parts order list

Multiple Ideas about how to do lectures and assignments:

Idea 1:
* Adapt the lecture slides to be more interactive and contain all the information that we would otherwise say out loud during the lecture
* Include links to the actual in-person lectures
* Include necessary demos
* Adapt assignments so that they are more of a walk-through sort (perhaps Google Form sort of thing?)

Idea 2:



* Have each Lecture and Assignment be formatted into a Google Form
* Google Form split into multiple sections
* Each section has an associated description/part of the slideshow to navigate through/demo/video explanation to watch
* Then answer the following questions
* The immediate next section will be answers (or an equivalent)

Content Order:



1. Overview of Micromouse and What it is
2. Power
3. Motors and Encoders
4. PID Control
5. IR Sensors
6. Floodfill
7. Schematic Design
8. PCB Design
9. How to Order Your Components and PCB
10. Extra Resources:
    1. Github Lecture
    2. Overview of Rat Schematic
    3. Overview of Rat Code
    4. Using STMCubeIDE
    5. C Coding
    6. Recommended Parts List


## Micromouse Outreach Curriculum Template 


### Overview of Micromouse & What it is



* A quick introduction to micromouse, the various topics we will cover, and the end goal (creating a working mouse)

Two main sections:



* Hardware and Software


### Hardware

1. Power
    1. Explain the different types of batteries and why we use Lipo batteries.
        1. Provide several options for lipo batteries
    2. Cover the power delivery schematic
        2. How is the appropriate amount of power provided to the rest of the components? 
        3. Mostly theoretical, talking about the voltage regulator & what it does along with the decoupling capacitors
        4. Sample power schematic shown at the end
    3. Goal: Explain our choice of batteries & the need for the voltage regulator 
2. Motors & Encoders
    4. Brief introduction to the different types of motors 
    5. Specs for our DC motors and why we use them 
        5. Includes voltage & current ratings and gear ratio (and what that means)
    6. Explanation of controlling motors w/ an h-bridge + schematic
    7. Explanation of what encoders are + our encoders 
3. IR Sensors
    8. Cover basic idea of using IR sensors to detect distance 
    9. IR schematic and how it works
    10. Introduce the idea of using IR readings for PID control


### Software



1. Installing CubeIDE
2. Basic walkthrough of Microcontroller Pin Setup Interface
    1. Explain why we set up the pins the way we do (i.e. we can explain the timers, what gpio pins are, and encoder channels here)
3. Motor and Encoder Setup
4. PID Control
    2. Explain what PID control is with visuals (like the gif used in the slides)
    3. A walkthrough of the PID templates; basically explain the pseudocode for PID control on the mice
    4. Introduce the possibility of using PID control w/ IR sensors as well (could provide a good transition to the next section)
5. IR Code Setup
    5. Walk through how to get & interpret IR values
    6. This would include the template for delay microseconds, delaying 20 us & why we do it
6. Maze Solving Algorithms
    7. Wall Follower
    8. Floodfill
    9. Explain how both work and possibly include pseudo code


### Extra Resources

1. Basic C coding concepts
    1. Links to good tutorial pages and YouTube videos