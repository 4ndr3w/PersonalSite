---
title: "OmniBot"
image: /images/omnibot2.jpg
date: "2017-02-02"
---

OmniBot is a 4 wheel holonomic platform built for autonomous navigation. The end goal for this project is to use SLAM to drive between waypoints while avoiding obstructions.

<!--more-->

![](/images/omnibot2.jpg)

Each layer of the robot is a sheet of polycarb connected by metal standoffs. Most of the electrical system is purchased or repurposed FIRST Robotics components from the pre-2015 control system. Sensor feedback is provided by a combination of the NeveRest gearmotor encoders, a 9-DOF BNO055 IMU, and a RPLIDAR A1.

OmniBot uses ROS for high level control, while realtime sensitive tasks are handled by the onboard NI cRIO. Additionally, a Raspberry Pi is onboard to publish LaserScan messages to a ROS topic. In development, most of the ROS nodes are ran offboard. In future revisions, I'm planning to move all computing onboard.

### First Revision

![](/images/omnibot.jpg)

OmniBot's first incarnation was only capable of maintaing a pose estimate using odometry and driving between waypoints. The entire control system ran on a Raspberry Pi 2 with an Adafruit PWM driver and a custom encoder interface.