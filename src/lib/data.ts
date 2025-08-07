

import type { Tag, Question, Test, TestAttempt, TestSession, QuestionGroup } from './types';

export const tags: Tag[] = [
  { id: 't1', name: 'JavaScript' },
  { id: 't2', name: 'React' },
  { id: 't3', name: 'CSS' },
  { id: 't4', name: 'General Knowledge' },
  { id: 't5', name: 'Reading Comprehension' },
];

export const questionGroups: QuestionGroup[] = [
    {
        id: 'g1',
        title: "For questions 6 to 7",
        referenceText: "The following passage is about the history of computing. Read it carefully and answer the questions that follow.\n\nThe first mechanical computer, created by Charles Babbage in 1822, was called the Difference Engine. It was designed to compute polynomial functions. Ada Lovelace, a mathematician, is often regarded as the first computer programmer for her work on Babbage's analytical engine. Her notes on the engine include what is recognised as the first algorithm intended to be carried out by a machine. Because of this, she is often considered the first computer programmer. The Analytical Engine was a more general-purpose computer. It could be programmed using punched cards. It was intended to be able to perform any calculation that could be imagined.",
        questionIds: ['q6', 'q7'],
        referenceImageUrl: "https://placehold.co/600x400",
    }
]

export const questions: Question[] = [
  {
    id: 'q1',
    text: 'What is the output of `typeof null` in JavaScript?',
    choices: [
      { id: 'q1c1', text: 'null' },
      { id: 'q1c2', text: 'object' },
      { id: 'q1c3', text: 'undefined' },
      { id: 'q1c4', text: 'string' },
    ],
    correctChoiceId: 'q1c2',
    explanation: 'This is a historical bug in JavaScript. `typeof null` returns "object" for legacy reasons, though it is a primitive value.',
    tags: ['t1'],
  },
  {
    id: 'q2',
    text: 'Which hook is used to perform side effects in a React functional component?',
    choices: [
      { id: 'q2c1', text: 'useState' },
      { id: 'q2c2', text: 'useContext' },
      { id: 'q2c3', text: 'useEffect' },
      { id: 'q2c4', text: 'useReducer' },
    ],
    correctChoiceId: 'q2c3',
    explanation: '`useEffect` is used for side effects like data fetching, subscriptions, or manually changing the DOM in React components.',
    tags: ['t2'],
  },
  {
    id: 'q3',
    text: 'What does CSS stand for?',
    choices: [
      { id: 'q3c1', text: 'Cascading Style Sheets' },
      { id: 'q3c2', text: 'Creative Style Sheets' },
      { id: 'q3c3', text: 'Computer Style Sheets' },
      { id: 'q3c4', text: 'Colorful Style Sheets' },
    ],
    correctChoiceId: 'q3c1',
    explanation: 'CSS stands for Cascading Style Sheets. It is used to describe the presentation of a document written in a markup language like HTML.',
    tags: ['t3'],
  },
  {
    id: 'q4',
    text: 'What is the capital of Japan?',
    choices: [
      { id: 'q4c1', text: 'Beijing' },
      { id: 'q4c2', text: 'Seoul' },
      { id: 'q4c3', text: 'Tokyo' },
      { id: 'q4c4',text: 'Bangkok' },
    ],
    correctChoiceId: 'q4c3',
    explanation: 'Tokyo is the capital and largest city of Japan.',
    tags: ['t4'],
  },
  {
    id: 'q5',
    text: 'Which CSS property is used to create space between the element\'s border and its content?',
    choices: [
      { id: 'q5c1', text: 'margin' },
      { id: 'q5c2', text: 'padding' },
      { id: 'q5c3', text: 'border-spacing' },
      { id: 'q5c4', text: 'outline' },
    ],
    correctChoiceId: 'q5c2',
    explanation: 'The `padding` property is used to create space around an element\'s content, inside of any defined borders.',
    tags: ['t3'],
  },
  {
    id: 'q6',
    text: 'Who is considered the first computer programmer?',
    choices: [
      { id: 'q6c1', text: 'Charles Babbage' },
      { id: 'q6c2', text: 'Alan Turing' },
      { id: 'q6c3', text: 'Ada Lovelace' },
      { id: 'q6c4', text: 'Grace Hopper' },
    ],
    correctChoiceId: 'q6c3',
    explanation: 'Ada Lovelace is credited with writing the first algorithm intended to be processed by a machine, making her the first computer programmer.',
    tags: ['t4', 't5'],
    groupId: 'g1',
  },
  {
    id: 'q7',
    text: 'What was the name of Charles Babbage\'s first mechanical computer?',
    choices: [
      { id: 'q7c1', text: 'The Analytical Engine' },
      { id: 'q7c2', text: 'The Difference Engine' },
      { id: 'q7c3', text: 'The Colossus' },
      { id: 'q7c4', text: 'The ENIAC' },
    ],
    correctChoiceId: 'q7c2',
    explanation: 'Charles Babbage\'s first mechanical computer, designed in 1822, was called the Difference Engine.',
    tags: ['t4', 't5'],
    groupId: 'g1',
  },
];

export const tests: Test[] = [
  {
    id: '1',
    title: 'Web Development Basics',
    description: 'A quick mock test to test your foundational knowledge of web development technologies.',
    allQuestionIds: ['q1', 'q2', 'q3', 'q5'],
    imageUrl: 'https://placehold.co/600x400',
    tags: ['t1', 't2', 't3'],
    questionCount: 4,
    duration: 5,
  },
  {
    id: '2',
    title: 'General Knowledge Challenge',
    description: 'How well do you know the world? Test your general knowledge with these questions.',
    allQuestionIds: ['q4'],
    imageUrl: 'https://placehold.co/600x400',
    tags: ['t4'],
    questionCount: 1,
    duration: 2,
  },
  {
    id: '3',
    title: 'Reading & Comprehension Practice',
    description: 'A test focused on reading comprehension and critical thinking, with grouped questions.',
    imageUrl: 'https://placehold.co/600x400',
    allQuestionIds: ['q4', 'q6', 'q7'], // all questions that will be available.
    duration: 10,
    subjects: [
        {
            id: 's1',
            name: 'General Knowledge',
            tags: ['t4'],
            questionCount: 1,
        },
        {
            id: 's2',
            name: 'Reading Comprehension',
            tags: ['t5'],
            questionCount: 2, // This will pull the 'g1' group which has 2 questions
        }
    ]
  }
];

export let testSessions: TestSession[] = [
    { id: 's1', testId: '1', questionIds: ['q1', 'q2', 'q3', 'q5'], questionGroupIds: [], startedDate: '2024-07-18T09:00:00Z' },
    { id: 's2', testId: '1', questionIds: ['q5', 'q1', 'q2', 'q3'], questionGroupIds: [], startedDate: '2024-07-21T11:00:00Z' },
    { id: 's3', testId: '2', questionIds: ['q4'], questionGroupIds: [], startedDate: '2024-07-19T14:30:00Z' },
    { id: 's4', testId: '2', questionIds: ['q4'], questionGroupIds: [], startedDate: '2024-07-22T11:00:00Z' },
    { id: 's5', testId: '3', questionIds: ['q4', 'q6', 'q7'], questionGroupIds: ['g1'], startedDate: '2024-07-23T10:00:00Z' }
];

export const testAttempts: TestAttempt[] = [
    // Attempts for session 1
    { id: 'att1', sessionId: 's1', startedDate: '2024-07-18T09:00:00Z', completedDate: '2024-07-18T09:05:30Z', score: 2, totalQuestions: 4, status: 'completed' },
    { id: 'att2', sessionId: 's1', startedDate: '2024-07-20T10:00:00Z', completedDate: '2024-07-20T10:04:00Z', score: 3, totalQuestions: 4, status: 'completed' },
    // Attempt for session 2
    { id: 'att3', sessionId: 's2', startedDate: '2024-07-21T11:00:00Z', completedDate: '2024-07-21T11:03:15Z', score: 4, totalQuestions: 4, status: 'completed' },
    // Attempt for session 3
    { id: 'att4', sessionId: 's3', startedDate: '2024-07-19T14:30:00Z', completedDate: '2024-07-19T14:31:00Z', score: 1, totalQuestions: 1, status: 'completed' },
    // In-progress attempt for session 4
    { id: 'att5', sessionId: 's4', startedDate: '2024-07-22T11:00:00Z', completedDate: '', score: 0, totalQuestions: 1, status: 'in-progress', answers: {} },
];


export const getTestById = (id: string) => tests.find(t => t.id === id);
export const getSessionById = (id: string) => testSessions.find(s => s.id === id);
export const getQuestionGroupById = (id: string) => questionGroups.find(g => g.id === id);

// This function now needs a session ID
export const getQuestionsForSession = (sessionId: string) => {
    const session = getSessionById(sessionId);
    if (!session) return [];
    return questions.filter(q => session.questionIds.includes(q.id));
}

export const getQuestionsForGroup = (groupId: string) => {
    return questions.filter(q => q.groupId === groupId);
}

// Get all question groups that are part of the current session
export const getQuestionGroupsForSession = (sessionId: string): QuestionGroup[] => {
    const session = getSessionById(sessionId);
    if (!session || !session.questionGroupIds) return [];
    return questionGroups.filter(g => session.questionGroupIds.includes(g.id));
};

const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// In a real app, you'd generate a new session.
export const getOrCreateTestSession = (testId: string): TestSession | undefined => {
    const test = getTestById(testId);
    if (!test) return undefined;

    let sessionQuestionIds: string[] = [];
    
    // Logic for tests with subjects
    if (test.subjects && test.subjects.length > 0) {
        let allSelectedQuestions: Question[] = [];

        test.subjects.forEach(subject => {
            // Create a pool of all questions matching the subject's tags
            const questionPool = questions.filter(q => 
                subject.tags.every(tagId => q.tags.includes(tagId))
            );
            
            // Shuffle the pool and take the required number of questions
            const selectedForSubject = shuffleArray(questionPool).slice(0, subject.questionCount);
            allSelectedQuestions.push(...selectedForSubject);
        });

        sessionQuestionIds = allSelectedQuestions.map(q => q.id);

    } else if (test.tags && test.questionCount) { // Logic for simple tests with tags and count
        const questionPool = questions.filter(q => 
            test.tags!.every(tagId => q.tags.includes(tagId))
        );
        sessionQuestionIds = shuffleArray(questionPool).slice(0, test.questionCount).map(q => q.id);

    } else { // Fallback for old test structure
        sessionQuestionIds = test.allQuestionIds;
    }

    // Final shuffle of the entire question list
    sessionQuestionIds = shuffleArray(sessionQuestionIds);
    
    // Identify required question groups from the selected questions
    const requiredGroupIds = new Set<string>();
    sessionQuestionIds.forEach(qId => {
        const question = questions.find(q => q.id === qId);
        if (question && question.groupId) {
            requiredGroupIds.add(question.groupId);
        }
    });

    const newSession: TestSession = {
      id: `s${Date.now()}`,
      testId: testId,
      questionIds: sessionQuestionIds,
      questionGroupIds: Array.from(requiredGroupIds),
      startedDate: new Date().toISOString()
    };
    
    // In a real app, this would be saved to a database. Here we add it to the in-memory array.
    testSessions.push(newSession);

    return newSession;
}


export const getTestAttemptsForUser = () => {
    return testAttempts.sort((a, b) => new Date(b.startedDate).getTime() - new Date(a.startedDate).getTime());
};

export const getSessionsForUser = () => {
    return testSessions.sort((a,b) => new Date(b.startedDate).getTime() - new Date(a.startedDate).getTime());
}

export const getAttemptsForSession = (sessionId: string) => {
    return testAttempts.filter(a => a.sessionId === sessionId).sort((a, b) => new Date(b.startedDate).getTime() - new Date(a.startedDate).getTime());
}
