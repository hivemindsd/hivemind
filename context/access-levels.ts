export default function getAccessLevelName(accessLevel: number) {
	switch (accessLevel) {
		case 1:
			return 'Caretaker'
		case 2:
			return 'Admin'
		case 3:
			return 'Owner'
		default:
			return 'Member'
	}
}
