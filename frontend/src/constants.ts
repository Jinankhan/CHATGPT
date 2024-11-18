import mygpt from '../public/assets/mygpts.svg';
import logout from '../public/assets/logout.svg';
import settings from '../public/assets/settings.svg';
import upgradePlan from '../public/assets/upgrade-plan.svg';
import customize from '../public/assets/customize-gpt.svg';
import brainstorm from '../public/assets/brainstorm.svg';
import analyze from '../public/assets/analyze.svg';
import help from '../public/assets/help.svg';
import image from '../public/assets/image.svg';
import summarize from '../public/assets/summarize.svg';
import surprise from '../public/assets/surprise.svg';
import plan from '../public/assets/plan.svg';
import google from '../public/assets/drive.svg';
import onedrive from '../public/assets/onedrive.svg';
import upload from '../public/assets/upload.svg';
import chat from '../public/assets/chat.svg';
import tasks from '../public/assets/tasks.svg';
import smart from '../public/assets/smart.svg';
import correct from '../public/assets/correct.svg';

import speaker from '../public/assets/speaker.svg';
import like from '../public/assets/like.svg';
import dislike from '../public/assets/dislike.svg';
import copy from '../public/assets/copyIcon.svg';

export const PROFILE_MODAL_DATA = [
  { name: 'My GPTs', src: mygpt },
  { name: 'Customize ChatGPT', src: customize },
  { name: 'Settings', src: settings },
  { name: 'Upgrade Plan', src: upgradePlan },
  { name: 'Log out', src: logout }
];

export const TASK_LISTS = [
  { name: 'Create Image', src: image },
  { name: 'Surprise me', src: surprise },
  { name: 'Help me write', src: help },
  { name: 'Summarize text', src: summarize },
  { name: 'Analyze data', src: analyze },
  { name: 'Brainstorm', src: brainstorm },
  { name: 'Make a plan', src: plan }
];

export const FILE_UPLOAD_TYPE = [
  {
    name: 'Connect to Google drive',
    src: google
  },
  {
    name: 'Connect to Microsoft onedrive',
    src: onedrive
  },
  {
    name: 'Upload from computer',
    src: upload
  }
];

export const CUSTOMIZE_CHATGPT = [
  {
    title: 'ChatGPT Plus',
    src: smart,
    caption: 'Our smartest model and more',
    component: { name: 'chip', content: 'Upgrade', src: '' }
  },
  {
    title: 'ChatGPT',
    src: tasks,
    caption: 'Great for everyday tasks',
    component: { name: 'icon', content: '', src: correct }
  },
  {
    title: 'Temporary chat',
    src: chat,
    caption: '',
    component: { name: 'switch', content: '', src: '' }
  }
];

export const SOCIAL_ICONS = [
  {
    name: 'Continue with Google',
    src: 'https://auth.openai.com/assets/google-logo-NePEveMl.svg'
  },
  {
    name: 'Continue with Microsoft account',
    src: 'https://auth.openai.com/assets/microsoft-logo-BUXxQnXH.svg'
  },
  {
    name: 'Continue with Apple',
    src: 'https://auth.openai.com/assets/apple-logo-vertical-full-bleed-tAoxPOUx.svg'
  }
];

export const MODEL_RESPONSE_ICONS = [
  { name: 'Read aloud', src: speaker },
  { name: 'copy', src: copy },
  { name: 'Good response', src: like },
  { name: 'Bad response', src: dislike }
];
