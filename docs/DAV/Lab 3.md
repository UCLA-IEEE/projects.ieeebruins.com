# Lab 3
### 6 FFT Under

* [0 Useful Diagrams](#0-useful-diagrams)
* [1 A Twiddle Bit Annoying](#1-a-twiddle-bit-annoying)
* [2 I can't belive it's not butter-fly](#2-i-cant-believe-its-not-butter-fly)
    * [2.1 The Ports](#21-the-ports)
    * [2.2 The Multiplication](#22-the-multiplication)
* [3 4ruit by the FFT](#3-4ruit-by-the-fft)
* [4 You're Fourgiven](#4-youre-fourgiven)
* [5 Checkoff](#5-checkoff)

## Introduction

Ah yes, the FFT. In lecture 3, we covered how the Fast Fourier Transform (FFT) works conceptually and broke it down into parts, and now it’s your turn to make it! In this lab, you’ll be taking four inputs, designing butterfly units, and connecting them to form a 4-point FFT module. This is the basic building block to the final Digital Audio Visualizer capstone, where you’ll need to take audio signals and convert them to the frequency domain with a minimum of a 16-point FFT.

## Resources and Reference Material

[Link to Lecture 3](https://drive.google.com/file/d/1ZpZNq0DCSLgWa0FdoBjDLQwYdLYMBiAf/view?usp=sharing)
[Pin Sheet](https://docs.google.com/spreadsheets/d/1jTgphR61ozrNZlr9dLvId5t3o0FrikxSZWwAvhXF0Yo/edit#gid=0)
[Verilog Docs](https://docs.google.com/document/d/1_8ruatZIb3sZb-3Kk3WOYC8Jzv4HvdwrTPZUGVupdVE/edit)

## Getting Help

You can contact us on Discord or in-person during our [lab hours](http://www.ieeebruins.com/lab).

**Claire Huang**		Discord: _zhiyujia

**Premkumar Giridhar**	Discord: _8bitrobot_

## 0	Useful Diagrams


![alt_text](images/image13.png "image_tooltip")
![alt_text](images/image14.png "image_tooltip")


## 1	A Twiddle Bit Annoying

Let’s start out with our twiddle factors. In this lab, we’ll be working with inputs that are 32 bits each - 16 real and 16 imaginary. This means that our twiddle factor will _also _be 32 bits, with 16 real bits and 16 imaginary. Remember to keep everything in two’s complement form!

Recall what a twiddle factor is from Lecture 3: 


![alt_text](images/image15.png "image_tooltip")


Also recall from lecture that we derive these twiddle factors by dividing up a unit circle. You’d usually expect four twiddle factors; but due to the symmetry of the unit circle, we can get away with just two (each one being positive/negative). That’s why in the 4-point FFT diagram above, there are only two twiddle factors (but their positions on the unit circle are the same as before!). You can use Euler’s, as shown in the equation above, to calculate these twiddle factors - the cosine part will be real, and the sine part will be imaginary.

In lecture, we also discussed that at the end of the multiplication process, we truncate by discarding the sign bit and taking the next 16 bits, discarding the last 15 at the end. Remember that this is essentially **dividing the result by 2<sup>15</sup>**. In order to counter this operation and avoid losing magnitude in our numbers, remember to left-shift your twiddle factor by 15, or more simply **multiply it by 2<sup>15</sup>** prior to encoding it into your module.

In Verilog, floating point math is hard, but signed integer math is easy! This has the following implications on our module.
* Every single port and wire in the butterfly unit should be declared using the `signed` keyword. This will affect the automatic sign-extension and rounding/overflow behavior, so it’s very important that you remember to include it.

    module (
    input signed [WIDTH-1:0] A
    );
    wire signed [WIDTH-1:0] C = A;
    endmodule

* Once you multiply your twiddle factor by 2<sup>15</sup>, you need to round to the nearest 16-bit integer and use that value as the twiddle factor in your module.
* When your twiddle factor is **1**, multiplying it by 2<sup>15</sup> will cause it to overflow, you should instead use the largest possible signed 16-bit value – **16’b0111 1111 1111 1111**.


## 2	I can’t believe it’s not butter-fly

It’s time to build the basic building block of our Fast Fourier Transform! Recall from lecture that the butterfly unit looks like this:


![alt_text](images/image16.png "image_tooltip")



### 2.1 	The Ports

Your butterfly unit should have the following:



* A **parameter** named **WIDTH** that determines the number of bits in the inputs. Our inputs for this part are 32 bits (16 real and 16 imaginary), so give it a **default value of 32**.
* Three **WIDTH** sized inputs. These will be A, B, and W.
* Two **WIDTH **sized outputs. These will be (A+WB) and (A-WB).

As mentioned before, everything will be in the same format - the left **WIDTH**/2 bits will be real, and the right **WIDTH**/2 bits will be imaginary. It might help you to split these up into separate wires for the real and imaginary component of each input, to make the math easier to follow around.


### 2.2	The Multiplication

When we’re multiplying two complex numbers, we can use the FOIL method.

![alt_text](images/image17.png "image_tooltip")

Make sure to test your results using a testbench! We’ve added a Python script to help you out with this. In the script, you should be able to input _A<sub>real</sub>, B<sub>real</sub>, A<sub>imag</sub>, _and _B<sub>imag</sub>_, as well as 4 twiddle factors. You should test that your outputs match the script; you may find your results off by a small amount, but it’s okay as long as your outputs are really only off by a little bit. It helps to test your module with somewhat large values – say, ±100 or greater – because the math is more susceptible to these rounding errors when the numbers are smaller.


## 3	4ruit by the FFT

It’s time to make the 4-point FFT!

We want to build the FFT using a finite state machine. Our inputs will look a little bit different! Now, we have:



* **Four** 32-bit complex inputs representing the samples being FFT’d
* 1-bit clock, 1-bit reset inputs
* 1-bit start input

And now, we want to output:



* **Four ** 32-bit complex outputs
* 1-bit “done” output (indicating when the FFT computation is done)

So how do we make this a finite state machine? We can treat each vertical “layer” of butterfly units as a state, along with a “RESET” state and a “DONE” state. During each state of our module, the inputs to the butterfly units will be set as the outputs of the previous state. This also means that we can reuse our butterfly units, so you’ll only need enough butterfly unit instantiations to perform the computations for one state. The twiddle factors will be hardcoded into this module.

Since we’re doing a 4-point FFT, we only need log<sub>2</sub>(**4**) = **2 stages**. Our finite state machine could look like this:


<table>
  <tr>
   <td>
<ul>

<li> <strong>RESET</strong>
</li>
</ul>
   </td>
   <td>Outputs are held at 0 until the  **start input ** goes high. When it does,
   go to  <strong>STAGE1</strong>.
   </td>
  </tr>
  <tr>
   <td>
<ul>

<li> <strong>STAGE1</strong>
</li>
</ul>
   </td>
   <td>The butterfly units’ inputs are set as the inputs to the module. The outputs are then calculated combinationally. After one clock cycle, go to <strong>STAGE2</strong>.
   </td>
  </tr>
  <tr>
   <td>
<ul>

<li> <strong>STAGE2</strong>
</li>
</ul>
   </td>
   <td>The butterfly units’ outputs are used to update their own inputs – refer to the diagram for the correct wiring. After one clock cycle, go to  <strong>DONE</strong>.
   </td>
  </tr>
  <tr>
   <td>
<ul>

<li> <strong>DONE</strong>
</li>
</ul>
   </td>
   <td>The outputs of the module are set to the results of <strong>STAGE2</strong>. The done flag is set high. Wait until the <strong>reset input</strong> goes high to return to  <strong>RESET</strong>.
   </td>
  </tr>
</table>


Once you’re done, use our testbench to test your new 32-bit 4-point FFT! You can then check this with the Python script to verify that the outputs are correct. 


## 4	You’re Fourgiven

_“Dad, I don’t know the square root of 16!”_

_“Son, I fourgive you.”_

Anyways, you’re almost done with this lab! Just one more thing to do.

We’re now going to transform our 32 bit FFT into a 16 bit FFT! This is useful because sometimes we want to use less precision to save space. This should be trivial if you parametrized everything earlier. Just change **WIDTH** to 16 (and make other changes to variable sizes as necessary). Remember, the twiddle factor only needs to be shifted by 7, and the truncation is also slightly different.

Make sure to test your design with a testbench!


## 5	Checkoff

In order to receive credit for this lab, please send screenshots of the simulation waveforms and console (with clear numbers!) to show that both the 32-bit and 16-bit FFTs are working correctly. Please use the input provided below and one more test case for each of the two FFTs.

**Input:**

&nbsp;&nbsp;&nbsp;&nbsp; **in0 = 		`100`**

&nbsp;&nbsp;&nbsp;&nbsp; **in1 = 		`150`**

&nbsp;&nbsp;&nbsp;&nbsp; **in2 = 		`200`**

&nbsp;&nbsp;&nbsp;&nbsp; **in3 =		`250`**

**Output:**

&nbsp;&nbsp;&nbsp;&nbsp; **out0 = 	`700+0j`**

&nbsp;&nbsp;&nbsp;&nbsp; **out1 = 	`-100+100j`**

&nbsp;&nbsp;&nbsp;&nbsp; **out2 =		`-100+0j`**

&nbsp;&nbsp;&nbsp;&nbsp; **out3 = 	`-100-100j`**