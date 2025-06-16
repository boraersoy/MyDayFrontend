


export const MoodColors = {
    happy: {
        color: '#E4C000',
        bg: '#FFF4B1',
    }, neutral: {
        color: '#aba07e',
        bg: '#EAE4D1',
    }, sad: {
        color: '#55A1CE',
        bg: '#B7D7EA',
    }, disgusting: {
        color: '#51c841',
        bg: '#98CE91'
    }, angry: {
        color: '#FF6B6B',
        bg: '#FFB1B1',
    }, amazing: {
        color: '#d8b148',
        bg: '#FFE5A0'
    }, surprised: {
        color: '#b465e1',
        bg: '#C5B6D0'
    }, tired: {
        color: '#d4829f',
        bg: '#D9B8C4'
    }, peaceful: {
        color: '#7bb289',
        bg: '#E0FBE7'
    }, anxious: {
        color: '#715a82',
        bg: '#C5B6D0'
    }, embarrased: {
        color: '#ed864f',
        bg: '#F7BFA1'
    }, confident: {
        color: '#318975',
        bg: '#7CD3BF'
    }, unknown: {
        color: '#7B7B7B',
        bg: '#E0E0E0',
    }}

export let TestMoodList = [
    {
        id: 1,
        name: 'Happy',
        color: MoodColors.happy.color,
        bg: MoodColors.happy.bg,
    },
    {
        id: 2,
        name: 'Sad',
        color: MoodColors.anxious.color,
        bg: "#C5B6D0",
    },
    {
        id: 3,
        name: 'Unknown',
        color: MoodColors.unknown.color,
        bg: MoodColors.unknown.bg,
    },
]
