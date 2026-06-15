/**
 * src/data/certifications.js
 *
 * ADD YOUR REAL CERTIFICATIONS HERE.
 * Each entry:
 *   id         — unique number
 *   title      — certificate name
 *   issuer     — who gave it (Coursera, Google, AWS, etc.)
 *   date       — month + year issued
 *   expires    — 'No Expiry' or expiry date string
 *   credentialId — your cert ID (shown on credential, used for verify link)
 *   url        — direct verify / credential link
 *   color      — accent colour for the card
 *   category   — for filtering tabs
 *   skills     — list of skills this cert covers
 *   logo       — issuer logo emoji or icon (replace with real image path if you have it)
 */
export const certifications = [
  {
    id: 1,
    title:        'Full Stack Web Development',
    issuer:       'Gen Process',
    date:         'July 2025',
    expires:      'No Expiry',
    credentialId: 'N/A',
    url:          'https://drive.google.com/file/d/1up6kUZLv491ACUNIe0uq4UBJi4jwAUMN/view?usp=drive_link',
    color:        '#61dafb',
    category:     'Frontend',
    skills:       ['React', 'Spring boot', 'Javascript', 'Fire base'],
    logo:         '🎓',
  },
  {
    id: 2,
    title:        'Google Android Developer',
    issuer:       'AICTE EduSkills in support with Google for Developers',
    date:         'Dec 2025',
    expires:      'No Expiry',
    credentialId: '7d107980a75d76b0ed78f15a6b36606c',
    url:          'https://drive.google.com/file/d/1uJkirkTLYa01JyK4F4dk-B9WTYTbIVrv/view?usp=drive_link',
    color:        '#ff9f43',
    category:     'Android Development',
    skills:       ['Android Development', 'Android Studio', 'ViewModel / LiveData', 'Kotlin'],
    logo:         '🌐',
  },
  {
    id: 3,
    title:        'AI & ML',
    issuer:       'AICTE EduSkills in support with Google for Developers',
    date:         'Mar 2026',
    expires:      'No Expiry',
    credentialId: '4660939970de9d2ce825',
    url:          'https://drive.google.com/file/d/13pS-VGPhdasQhdtCLxS6hB4bl3H29Rfu/view?usp=drive_link',
    color:        '#00d4ff',
    category:     'AI / ML',
    skills:       ['Scikit-Learn', 'Neural Networks', 'Python', 'TensorFlow'],
    logo:         '🤖',
  },

  {
    id: 4,
    title:        'AWS Gen ai',
    issuer:       'AICTE EduSkills in support with Google for Developers',
    date:         'Sep 2025',
    expires:      'No Expiry',
    credentialId: 'b077a2c68b404ddf0ffd0c0a68253ee3',
    url:          'https://drive.google.com/file/d/1Ie6DggBWebvibTgoWEO4-0wL3upFwx2R/view?usp=drive_link',
    color:        '#ff9900',
    category:     'Gen AI',
    skills:       ['Amazon Bedrock', 'Prompt Engineering', 'RAG', 'Foundation Models'],
    logo:         '☁️',
  },
  {
    id: 5,
    title:        'AI tools',
    issuer:       'talentize',
    date:         'july 2026',
    expires:      'No Expiry',
    credentialId: 'UC-CCCCCCCCCCC',
    url:          'https://udemy.com/certificate/UC-CCCCCCCCCCC',
    color:        '#f05032',
    category:     'Tools',
    skills:       ['On process'],
    logo:         '🔧',
  },
]

export const certCategories = ['All', 'Frontend','AI / ML', 'Gen AI', 'Android Development', 'Tools']