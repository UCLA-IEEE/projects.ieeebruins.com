# Overview of WRAP

At a high level, you will do just about everything needed to get a string of bits from one microcontroller to another, without any wires between the two (and at 27MHz!). This means writing the code to encode a digital signal onto an analog carrier wave, designing and building the transmitter and receiver boards for this RF signal, and finally the code to decode it back into a (hopefully) error-free digital signal.

In WRAP you will be able to:



* Understand RF systems: how to work with and design things at the system level
* Designing RF amplifiers, mixers and filters
* Building those yourself (including winding your own transformers!)
* Using ADCs and DACs to sample RF signals
* Designing and implementing a digital communication system
* Tools you'll get comfortable with: LTSpice, Matlab, STM CubeIDE, embedded C, PCB layout tools (Autodesk Eagle), RF bench equipment (oscilloscope, vector network analyzer, spectrum analyzer, etc.)

An alternative form of learning to these modules are the UCLA IEEE lecture videos. We highly recommend watching them if you have any doubts as you read through the modules, or if you just want to watch a lecture video instead of going through the modules yourself. Just note that there will be other things talked about in the videos that would be related to the overall project at UCLA’s IEEE branch. 


# Content:

**<ins>Introduction to RF & Analog Circuits:</ins>**



* Overview of 102 materials, general circuit theory (frequency response, two-ports, non-idealities) and how they affect our signal integrity and transmission.
* Briefly cover operation physics of resistors, capacitors, inductors, diodes and transistors.
* Brief Transmission Line theory.

**<ins>An Introduction to RF System Design:</ins>**



* Block-view of our RF system & general design considerations.
* Deeper dive into our goal and how it can be achieved.
* Introduces dedicated blocks that we will need (Amplifiers, Mixers, Oscillators, Filters, Buffers, Matching networks). 

**<ins>Active Elements: A Dive Into Transistor Circuits</ins>**



* Cover Class A amplifiers and buffers & transistor biasing. 
* Input and Output impedance for impedance matching & signal path modifications (bypass/decoupling caps).

**<ins>Frequency Scaling & Isolation:</ins>**



* Cover mixers and oscillators and why we need them (to upconvert and downconvert frequencies).
* Learn about the diode ring mixer and colpitts oscillator that we will use in the project.
* Relate the transistors input characteristics to the operation of our colpitts oscillator.
* Bandpass, Lowpass, Highpass, Bandstop filters for isolation of signals of interest.

**<ins>Impedance Matching:</ins>**



* Deeper look into Transmission Line theory and matching networks such as T-pad attenuators and LC matching networks. 
* Why we use these techniques and when (protect our microcontrollers from reflections, want as much power transfer from stage to stage, etc).

**<ins>More Advanced Design Procedures:</ins>**

* Active Filters with op-amps (provide the same “filtering” that the passive LC filters from before do, but also add gain).
* S-Parameters for amplifier design & stability to maximize gain (ADS).
* Low-Noise Amplifier on the input of the Receiver side to set Noise Floor (Friis Equation). 