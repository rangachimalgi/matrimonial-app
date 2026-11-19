import { ImageSourcePropType } from 'react-native';

export type MatchProfile = {
  id: string;
  name: string;
  age: number;
  city: string;
  profession: string;
  religion: string;
  caste: string;
  gotra: string;
  education: string;
  height: string;
  motherTongue: string;
  about: string;
  family: string;
  photo: ImageSourcePropType;
};

export const MATCHES: MatchProfile[] = [
  {
    id: '1',
    name: 'Ananya',
    age: 26,
    city: 'Bengaluru',
    profession: 'Software Engineer',
    religion: 'Hindu',
    caste: 'Brahmin',
    gotra: 'Bharadwaj',
    education: 'B.E. Computer Science',
    height: `5'5"`,
    motherTongue: 'Kannada',
    about:
      'Quiet weekends, long walks, and good filter coffee. Looking for someone kind, grounded, and family-oriented.',
    family: 'Nuclear family · Father works in banking · Mother is a teacher',
    photo: require('../assets/images/avatar-2.jpg'),
  },
  {
    id: '2',
    name: 'Rahul',
    age: 29,
    city: 'Hyderabad',
    profession: 'Product Manager',
    religion: 'Hindu',
    caste: 'Kamma',
    gotra: 'Kashyapa',
    education: 'MBA, IIM',
    height: `5'10"`,
    motherTongue: 'Telugu',
    about:
      'Travel, cricket, and cooking on Sundays. Want a partner who values honesty and shared growth.',
    family: 'Joint family · Two siblings · Based in Hyderabad',
    photo: require('../assets/images/avatar-1.jpg'),
  },
  {
    id: '3',
    name: 'Meera',
    age: 25,
    city: 'Pune',
    profession: 'Architect',
    religion: 'Hindu',
    caste: 'Maratha',
    gotra: 'Vasistha',
    education: 'B.Arch',
    height: `5'4"`,
    motherTongue: 'Marathi',
    about:
      'Design nerd with a soft spot for classical music. Looking for warmth, respect, and easy conversations.',
    family: 'Nuclear family · Parents in Pune · One younger brother',
    photo: require('../assets/images/avatar-3.jpg'),
  },
  {
    id: '4',
    name: 'Arjun',
    age: 28,
    city: 'Chennai',
    profession: 'Doctor',
    religion: 'Hindu',
    caste: 'Iyer',
    gotra: 'Atri',
    education: 'MBBS, MD',
    height: `5'9"`,
    motherTongue: 'Tamil',
    about:
      'Hospital shifts and temple visits. Seeking a life partner who understands ambition with balance.',
    family: 'Traditional family · Father is a professor · Mother homemaker',
    photo: require('../assets/images/avatar-4.jpg'),
  },
  {
    id: '5',
    name: 'Diya',
    age: 27,
    city: 'Mumbai',
    profession: 'Marketing Lead',
    religion: 'Hindu',
    caste: 'Agarwal',
    gotra: 'Garg',
    education: 'B.Com, MBA',
    height: `5'6"`,
    motherTongue: 'Hindi',
    about:
      'City girl with hometown values. Love books, street food, and slow Sunday mornings.',
    family: 'Business family · Two sisters · Settled in Mumbai',
    photo: require('../assets/images/avatar-5.jpg'),
  },
];
