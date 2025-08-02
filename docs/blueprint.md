# **App Name**: QuizWise

## Core Features:

- Quiz Interface: Provide a form-based UI for users to answer multiple-choice questions.
- Test Results: Calculate and display the test score, indicate correct/incorrect answers, show correct answers for the incorrect ones, and provide explanations.
- Admin Panel: Secure admin panel for managing questions and tags.
- Question Management: Create and edit questions manually, including the question text, choices, correct answer, and explanation.
- Bulk Upload: Admins can upload questions from CSV files to add multiple questions at once. This feature needs a parser to handle the uploaded CSV/JSON files.
- Tag Management: Dedicated interface in the admin panel to create, update, and delete tags for question categorization.
- Test Configuration: Group questions to form a test either by selecting questions individually or filtering using tags.

## Style Guidelines:

- Primary Color: `Powder Blue (#B0E0E6)` A soft, welcoming blue that promotes calmness and concentration without feeling cold. Use this for main headers, active states, and key branding elements.
- Background Color: `Alice Blue (#F0F8FF)` A very light, almost-white blue that provides a soft, clean, and unobtrusive backdrop. It's easier on the eyes than stark white.
- Accent & Interactive Color: `Muted Coral (#F88379)` A warm, friendly accent used for buttons, links, and important calls-to-action. This color stands out just enough to guide the user without causing distraction.
- Correct: `Sea Green (#2E8B57)` - A clear, positive green for correct answers and success messages.
- Incorrect: `Indian Red (#CD5C5C)` - A soft but clear red to indicate incorrect answers, avoiding overly harsh tones.
- Explanation/Info: `Steel Blue (#4682B4)` - A darker, serious blue for the explanation text boxes to give them visual weight and importance.
- Headlines & Titles: 'Poppins' A geometric sans-serif with a friendly, rounded appearance. It's professional yet approachable, perfect for making titles stand out clearly.
- Body & Paragraphs: 'PT Sans' A humanist sans-serif that is exceptionally easy to read in longer blocks of text, such as question text and explanations. Its open forms reduce eye strain.
- Style: Use a lightweight, outline-style icon set for a modern and clean look.
- Correct: `✓` (Checkmark)
- Incorrect: `✗` (Cross mark)
- Explanation: `💡` (Lightbulb) or `ℹ` (Info circle)
- Navigation: `→` (Arrow for next), `←` (Arrow for back)
- Generous Whitespace: Use ample space around elements to let the content breathe. This helps users focus on one piece of information at a time (e.g., one question).
- Clear Visual Hierarchy: Headings should be significantly larger than body text. Interactive elements should be clearly defined by color and placement.
- Card-Based Design: Display each question and each result breakdown in its own "card." This visually contains information, making it easier to scan and digest.
- Hover States: Interactive elements like buttons and selectable answers should have a clear hover effect (e.g., a slight lift or color change) to signal interactivity.
- Transitions: Use smooth, gentle transitions when moving between questions or loading the results page. Avoid jarring or abrupt changes.
- Feedback Animation: When a user submits an answer, provide instant visual feedback. For example, the selected option could briefly flash the appropriate feedback color (green for correct, red for incorrect).
- must be ui responsive and for both accessing using phone or a computer