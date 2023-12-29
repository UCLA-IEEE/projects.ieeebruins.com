# Module 2
### Return of the Amplifiers! (With a twist)


![alt_text](images/image6.png "image_tooltip")


**<ins>Lecture Notes:</ins>**

[Lecture 2 Notes](https://drive.google.com/file/d/1dELZCNGZFk3gMKIeW0V8cDILK0TgxSMv/view?usp=sharing)

**<ins>Motivation:</ins>**

Alright, hopefully everyone is feeling good with some snazzy common emitter amplifiers under their belts. You should be pretty comfortable working in LTSpice and will only continue to get more used to it throughout this assignment.

We discussed some of the impedance related shortcomings that a CE amplifier has at the end of the first lecture, and introduced the common collector amplifier as our solution. For the first part of this assignment, we revisit that lecture to design a common collector amplifier. Afterwards, we use them in a Colpitts oscillator, as we discussed in lecture 2. 

 

**<ins>Prerequisites:</ins>**

General understanding of continuous signals and systems

Circuit Theory 1 and 2 (KCL, KVL, super-position, linearity, linear circuit elements, frequency response, power, impedance)

Principles of Feedback & Control

**<ins>Skills Learned:</ins>**

LTspice circuit design

Common Collector amplifier design

Designing for input and output impedance

Oscillator Design

**<ins>Parts List:</ins>**

LTspice


## Part 1: Common Collector Amplifier

We’re going to start this assignment by designing an isolated common collector amplifier. The specs we want you to meet are:

Use Vcc = 5V

Gain of 0.5

This gain is defined as the voltage at the load divided by the input voltage, including any voltage dividing effects between the output impedance of the amplifier and the load

Load resistance of 50Ω (recall you used a large value before, e.g. 100kΩ)

Source resistance of 50Ω (you may need to add a 50Ω resistor between the input AC voltage and the input to the amplifier)

Output impedance is 50Ω (note that this DOES NOT include the load resistance)

**<ins>Checkpoint 1: The CC Amplifier</ins>**

We’re going all the way in one shot here, based on what you learned from module 1.

You have a fair bit more freedom with design choices here. This is intentional, since as we progress through the project you will often need to define a lot of specs on your own based on the requirements of your system. Here are a few good guidelines to get you started:



* Try placing the emitter voltage Ve at roughly Vcc/2. Doing so enables the amplifier to have a larger output swing (i.e. the maximum output amplitude before the amplifier stops working).
* Start with the output impedance equation given in the slides. You know the source resistance (50Ω), you know beta (somewhere around 100), you don’t know anything else. But you can make some engineering approximations. For example, if you do things right, R1 and R2 should be much larger than Rs, so you can ignore R1 and R2. Try to see how else you can simplify the expression (remember what we discussed in the first lecture, the factor of beta is quite large and should guide the approximations you make).
* Once your output impedance is correct, the gain should follow naturally (to within some tolerance). Try to understand why. It might be useful to retrace the approximations you made with the actual values you now have. See how accurate they are and which ones you should/should not make in the future. 
* Pick R1 and R2 such that the current flowing through them is significantly less than the collector current.

Please note that of the three following criteria, matching the first two are the most important and should be the main takeaways of the assignment. It is perfectly acceptable to not meet the third requirement, provided that the first two are met - although it is important to understand why the third requirement is there in the first place and why it is something we do not consider as strongly as the first two. 



* Correct output impedance of around 50 Ohms
* Correct gain of around 0.5
* Currents through the base biasing resistors should have as small a DC current relative to the DC current going through the BJT collector. 


## Part 2: Collpitts Oscillators

Let’s start with motivating our goals for what frequencies we want to generate. Here is what we know (the following is written from the perspective of a transmitter, but the exact same reasoning holds for a receiver):

Our input frequency is 1MHz - this is a pseudo arbitrary choice. It is in part defined by the sampling rate of the DAC and ADC on the MCU we will use (and the implications that it has on signal frequency, à la Nyquist criteria). However, that process just gives us a boundary and the exact choice is a combination of having some margin from the boundary and a preference for nice round numbers like 1.

Our desired output frequency is 27MHz. Let’s say that to generate the 27MHz signal we want, we use a carrier of 28MHz. We now have to filter out the other frequencies that are also created (more on this in lecture 4). This can be slightly painful to do though. For now, think of it in terms of fractional bandwidth - you want a filter centered at 27MHz that blocks something 1MHz higher than it, i.e., your fractional bandwidth is 1/27. A filter this tight is difficult to design and even harder to actually construct from discrete components.

So, we split this process into two steps. We upconvert to some intermediary frequency X, which we then upconvert again to 27MHz (more on the details of upconversion in lecture 3). For now, suffice to say that if we want roughly equal fractional bandwidth for both filters to make their design easier, then X = sqrt(27) = ~5 MHz (again, we like nice round numbers).

Thus, we need local oscillators that provide us two frequencies - one to go from 1MHz to 5MHz and another to go from 5MHz to 27MHz. For this assignment, we will design a 4MHz Colpitts oscillator and a 22MHz Colpitts oscillator. These can be used for both the upconversion in the transmitter and the downconversion in the receiver. 

**<ins>Checkpoint 2: The (First) Colpitts Oscillator</ins>**

We’ll start with a Colpitts oscillator that outputs a 4MHz sine wave. Using the topology shown in lecture 2, design an oscillator that fulfills the following requirements:



* Outputs a sine wave at 4 MHz
* Vcc = 5V
* Uses an inductor in the range 500nH to 1uH. Try searching for inductors within this range and look at the datasheet to see what the Q factor is. Most data sheets have plots of Q factor over frequency. (make sure to calculate the appropriate series resistance using the equation from the slides and add it to your schematic. It may be easier to visualize if you add an additional resistor rather than add it as a property of the inductor.)
* Output amplitude of 1V (This will be important once we get to mixers)
* All harmonics of the fundamental should be at least 20dB below the fundamental. Here, the fundamental refers to the 4MHz component of the output. Harmonics are multiples of the 4MHz frequency. To check this, perform an FFT operation on the output voltage (you can do this in LTSpice during the transient simulation), and measure the signal level in dB of the fundamental and the harmonics. A harmonic that is 20dB below the fundamental is ten times lower in amplitude than the fundamental. Decibels come up frequently in communications (and most engineering related things), so it’s best to get used to them now!

To open up the FFT of a signal in LTSpice, plot it as you normally would. Once you have the plot open, right-click on that window and you should see View -> FFT. You can then add cursors exactly as you would to a time-domain plot.

When performing the FFT of your output signal, make sure to capture a very large number of periods (set the simulation time to a few hundred periods of your signal) and set the “Time to start saving data” under the transient simulation options such that you do not capture the initial transient of the oscillations building up. This will increase the frequency resolution you have once you perform an FFT. A sampling command that works well for most frequencies we use would be: ‘.tran 0 75u 50u’

Again, this design is very open to engineering choices. What bias current should you choose? What inductor and capacitor values should you choose for your LC tank? Here’s some tips:



* Choose an inductor value first, the exact value isn’t too critical. Just make sure it lies in the given range. Compute the series resistance and include it in your schematic
* Start by choosing the two LC tank capacitors to be equal. Once you have an inductor value, you can easily find the capacitors using the equation for oscillation frequency.
* Find out what gm you need given your LC tank values. Knowing gm gives you what collector current you need. Make sure to choose a gm roughly 2 times bigger than the minimum required for oscillation. You may need to adjust the collector current later to get the output amplitude you need.
* Try sticking the emitter voltage at roughly 2.5V to maximize output swing.
* Compute the reactance of C2 and make sure RE is much bigger than that reactance. Doing so ensures that RE will not load the LC tank too much. This hopefully should not conflict with the above step.

Once you have completed your design, measure the time domain output and the frequency domain output.

**<ins>Checkpoint 3: The (Next) Colpitts Oscillator</ins>**

Repeat the above steps for a 22 Mhz oscillator. The process should be much easier since you can rely on some of the work you’ve already done in the previous part.

When choosing L and C values, try to do so so that the capacitors are not more than 3-4x larger than 40pF. When you start soldering these circuits together, you will add variable capacitors in parallel to your fixed ones to let you tune the oscillator. These variable capacitors are usually quite small and if your fixed values are too big, you won’t have much ability to tune them.

If you calculate a ‘minimum’ possible value for generated frequency, using capacitors of about 120pF and an inductor of 1uH, you will realize that this is not possible for the 4MHz oscillator. You will likely need significantly larger capacitors (of the order of nF) for it. This is fine though, since we only really need to be able to tune one of the oscillators to give us the desired degree of flexibility in correcting for real-world deviation from the simulation.

After you’ve identified the appropriate values for L and C, when biasing for gm you can reuse the amplifier setup from before, only varying the emitter resistor as needed.
