<h1> OMNIBUS </h1>
an university bus tracker with real-time tracking service with an android and web client.

### 1. Introduction
University public transportation systems frequently suffer from a lack of reliable real-time information for student. This creates a situation of information asymmetry, where transit operators possess detailed operational data while passengers must make travel decisions with limited knowledge of system conditions.
The OmniBus interface addresses this problem through a visual system integrating real-time vehicle tracking, predictive arrival estimates, operational status indicators, and location-based routing information.
### 2. Theoretical Foundation: Transit Economics and Waiting Cost
From the standpoint of transport economics, waiting time is not simply a physical delay but a perceived cost experienced by passengers. <br>
Passenger utility can be formally expressed as: <br>
$U=V−C(tw)$ <br>
Where: <br>
- U represents the user’s net utility from using the transit system. <br>
- V represents the value derived from reaching the destination. <br>
- C(tw) represents the perceived cost associated with waiting time (tw). <br>

Fact: Empirical studies demonstrate that uncertain waiting is perceived as more costly than predictable waiting. By displaying a 23-minute ETA for a bus traveling to Gauhati University, the system replaces uncertainty with actionable data, directly reducing C(tw) and increasing overall utility.

#### Basic Tech-Stack:
- Front-End : HTML, CSS, Js
- JavaScript Framework for Integration: LeafLet
- Back-End: Python Django
- Database: Postgres SQL
