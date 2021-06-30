---
layout: home
permalink: index.html

# Please update this with your repository name and project title
repository-name: e17-3yp-smart-garbage-collection
title: Smart Garbage Collection
---

[comment]: # "This is the standard layout for the project, but you can clean this and use your own template"

# Smart Garbage Collection

---

## Team
-  E/17/352, Tillekeratne L.J.I, [email](mailto:e17352@eng.pdn.ac.lk)
-  E/17/398, Wijerathne I.D.H.S.D, [email](mailto:e17352@eng.pdn.ac.lk)
-  E/17/148, Kalpana M.W.V, [email](mailto:e17148@eng.pdn.ac.lk)

<!-- Image (photo/drawing of the final hardware) should be here -->

<!-- This is a sample image, to show how to add images to your page. To learn more options, please refer [this](https://projects.ce.pdn.ac.lk/docs/faq/how-to-add-an-image/) -->

<!-- ![Sample Image](./images/sample.png) -->

#### Table of Contents
1. [Introduction](#introduction)
2. [Solution Architecture](#solution-architecture )
3. [Hardware & Software Designs](#hardware-and-software-designs)
4. [Testing](#testing)
5. [Detailed budget](#detailed-budget)
6. [Conclusion](#conclusion)
7. [Links](#links)

## Introduction


### Overview

The problem of proper garbage collection & disposal is a continuous struggle that we face as a country. Not only in cities but also in places like large parks, grounds, organizations such as schools, universities, offices and factories also are in need of a solution for proper garbage disposal and collection. Identifying the priorities of where and when to collect the garbage first and assigning people for different places is very hard without getting a proper overview. Therefore, the authorities assigned to do the garbage collection often end up not providing a proper service to the publlic. Complaints from the general public who are in need of a way to dispose house hold garbage are also arising because of these issues. Current garbage bin systems that are used by the public, often get overflown affecting the scenic beauty of the environment and also causing many health problems. People getting used to burn plastic, polythene because of not having a proper way to dispose house hold garbage also causes envioronmental pollution.

Therefore, addressing all these problems along with some other unique features we have come up with the Smart Garbage Collection System. It provides a platform to manage garbage collecting in a large area with proper coordination between the responsible authorities and the workers assigned to collect garbage while utilizing the available resources effectively. And also the people who are in need of a proper system to dispose garbage will be benefited by the system. The system can be implemented in cities, grounds, parks and any large public areas and it will make a high positive impact on public health & environment as well.

### Features

## Features

### Hardware
- Sensors to get fill level (volume & weight) of garbage.
- Sensors to identify garbage type(plastic,glass)
- LED indicator(red,yellow,green) to show fill level on the garbage bin & for night visibility.
- Compaction mechanism along with a security sensor used to compact garbage when garbage limit is full. (Compaction happens only when security sensor identifies when bin is not used. Compaction will reduce the number of times that bins should be emptied.)
- Solar panel to get power 
- Fragrance unit to get rid of the smell (activates once food waste bin is opened and filled upto some level)
- Locking system - red bins will be locked
- Qr scanner to unlock (used by people who collect garbage)


### Website
- To get the overview of the garbage bin( fill level, battery capacity, garbage categories ..) & decide the priority
- Assign employees to the each garbage bin to collect the disposal
- View bins and garbage collecting employees in a map
- Lock/unlock bins (system will be able to lock a certain bin once it reaches some limit as a solution for avoiding overflowing garbage bins)
- Add/remove new bins to the system
- Set parameter values(fill level and garbage categories) for indication of status(red,yellow,green) and to set when to do compaction process

### Mobile App

- Get the request of collecting garbage/ Accept the request/ cancel the request
- Along with the request a qr code will be given to unlock red bins. Can scan it to open the bin.
- To get the information about the assigned bins
- Using map can easily locate the bin


## Solution Architecture

High level diagram + description

## Hardware and Software Designs

Detailed designs with many sub-sections

## Testing

Testing done on hardware and software, detailed + summarized results

## Detailed budget

All items and costs

| Item          | Quantity  | Unit Cost  | Total  |
| ------------- |:---------:|:----------:|-------:|
| Sample item   | 5         | 10 LKR     | 50 LKR |

## Conclusion

What was achieved, future developments, commercialization plans

## Links

- [Project Repository](https://github.com/cepdnaclk/{{ page.e17-3yp-smart-garbage-collection }}){:target="_blank"}
- [Project Page](https://cepdnaclk.github.io/{{ page.e17-3yp-smart-garbage-collection}}){:target="_blank"}
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)

[//]: # (Please refer this to learn more about Markdown syntax)
[//]: # (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
