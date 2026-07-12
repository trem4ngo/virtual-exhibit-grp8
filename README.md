# A CSARCH2 Proposal 

**By Group 8 of S40:** Dela Cruz, Ramos, Tengco, Vicencio, Willie

Website Link: https://trem4ngo.github.io/virtual-exhibit-grp8/

## CREATIVE DEVELOPMENT

### Mid-Milestone Submission Progress:

| Phase | Description |
| :--- | :--- |
| **Refactoring** | - **Initial Refactoring:** removed files such as the Linux distro exhibit page, components, and image assets as they’re remnants from the template and are thus unneeded.<br>- **SSD Quiz refactoring:** instead of having the quiz be embedded within the main exhibit page, it will be moved to its own separate page where it will be presented as a single-page form with name fields.
| **Features** | - **SSD vs HDD React Component:** Implemented an interactive SSD vs HDD comparison component using React. Utilizes component states and timers to animate the difference between the speeds of an SSD and an HDD fetching data, using their respective real-world speed ratio.<br>- **Multiple-Choice SSD Quiz:** Implemented a multiple-choice quiz on how SSDs work, where the viewer visits a different page dedicated to the quiz itself and is presented with multiple choice questions. Upon answering and submitting, the page will show the correct answers (if and when the viewer makes a mistake), as well as the viewer’s score at the top of the page. Utilizes several React concepts including state management (to track user input, chosen answers, and whether or not they have submitted, conditional rendering, immutability, and more.<br>- **Main Exhibit Page:** Implemented the main exhibit page, which contains the previous two React components, as well as the bulk of the explanations that the viewer will have to read through. This also serves as the homepage as well.
| **Fixes** | - **URL config:** Fixed the astro config file to correctly link to the group’s github.<br>- **Empty Table of Contents:** Fixed the empty Table of Contents in the SSD quiz page.<br>- **Missing Borders:** added the missing black borders to the first/last name input fields in the SSD page to make them more readable amidst the white background. |

### Final Submission Progress:

TBD

## CONCEPTS LEARNED

### Mid-Milestone Concepts:
- Learned how to utilize and navigate Astro, which utilized similar concepts to JavaScript, making it easier to adapt to using this framework.
- Learned how to make and integrate React components into the webpage. Since React is based on JavaScript, it was easy for us to build React components such as the multiple-choice quiz and the interactive SSD vs HDD component, as the syntax remains relatively the same.

### Final Submission Concepts:

TBD

## CHALLENGES

### Mid-Milestone Submission Challenges:
- One challenge that our group faced was getting used to a new language and coding with different components in mind. Doing a new coding project with new libraries and new conventions will always be a challenge at the start, thankfully as we got through the project, we became familiar with this new environment. Also, we are thankful that we were taught different languages in previous courses. It really helped that we are familiar with languages that are popular and that are used by other languages as their basis. Hence, we got through this challenge fairly quickly.
- Another challenge that our group faced was implementing our proposed website design and following through our design. Our website design is as simple as it gets, yet we were reminded that actually implementing the design in code can somewhat be tricky with the nuances of the languages. For example, somewhat of a headache, the quiz for our website was somehow embedded on our main page even though it should be its own separate page. We were able to fix this problem by creating the quiz page’s markdown file.

### Final Submission Challenges:

TBD

## TOPIC THEME:
Our group's topic, under the category of 'How it Works', will be: How SSDs work. From this topic, the proposed exhibit will highlight the specific advantages of the Solid State Drive (SSD), by contrasting its features with a mechanical Hard Disk Drive. In addition, the proposed exhibit will cover the internal intricacies of an SSD, specifically how data is written and stored within NAND Flash memory, as well as the role of an SSD controller within an SSD's functions. 

## TECH STACK PLAN: 

### Proposed Interactive Elements: 

| Interactive Element | Detailed Description |
| :--- | :--- |
| **Multiple-choice quiz** | The exhibit will feature a multiple-choice quiz coded with React components (tentative) that will only come into view (i.e: client:visible, placed at the end of the exhibit's page) once the user is finished scrolling/reading through the exhibit itself. [cite: 8] [cite_start]The quiz will test the user's knowledge in regards to how SSDs work and will show the user's total understanding of the topic in the form of a final score that will appear after the user has finished taking the quiz. Additionally, we plan to add a feature in the form of a highlighted inline explanation that will explain the user's mistake should they choose the wrong answer. 
| **Video Gallery Comparison** | For the exhibit's section on the comparisons between a SSD and an HDD, we plan to incorporate a multimedia gallery. Within this gallery, it will utilize side-by-side video comparisons to highlight the SSD's speed advantages in real-world scenarios as compared to a mechanical HDD. This will include a comparison between the respective read/write times of particularly large file transfers, the loading times of computationally demanding programs, and vice versa. These videos will be mainly sourced by our own group, with benchmark footage from external reviewers being potentially used (with the appropriate copyright citations) if our group is unable to record certain videos. |

## Tentative Style Guide Snapshot / Proposed Virtual Exhibit Design Layout:
<img width="1920" height="1081" alt="Desktop" src="https://github.com/user-attachments/assets/b87646ff-af12-46ef-ac86-5ccdf595a4b3" />

*Home Page*

<img width="1920" height="1080" alt="Desktop" src="https://github.com/user-attachments/assets/b420da10-bf53-4171-bf2e-a41e66c9faa2" />

*Quiz Page*

<img width="1920" height="1080" alt="Desktop" src="https://github.com/user-attachments/assets/85a47fe7-9dbf-43a3-9bd2-e1a57f1c23b1" />

*Video Gallery Page*

## Mobile Responsive Layout: 
<img width="375" height="1080" alt="Mobile" src="https://github.com/user-attachments/assets/a8e2d165-1e87-443d-8209-38766b2572d0" />

*Home Page*

<img width="375" height="1080" alt="Mobile" src="https://github.com/user-attachments/assets/0a0977ce-b8dc-45a6-b138-abbdf3647cc3" />

*Quiz Page*

<img width="375" height="1080" alt="Mobile" src="https://github.com/user-attachments/assets/dbd4417d-4b76-4856-aad0-a298cf0cd08c" />

*Video Gallery Page*
