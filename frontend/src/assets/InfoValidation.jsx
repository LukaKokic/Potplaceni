export function ValidateNumber(val, name) {
	if (val.length == 0)
		{ window.alert("No " + name + " entered."); return false; }
	if (isNaN(val))
		{ window.alert(name + " invalid."); }
	return true;
}
export function ValidateString(val, name) {
	if (val.length == 0)
		{ window.alert("No " + name + " entered."); return false; }
	return true;
}
export function ValidateDropdown(val, name) {
	if (val == "")
		{ window.alert(name + " not chosen."); return false; }
	return true;
}

export function ValidatePIN(str) {
	if (str.length != 8 || isNaN(Number(str)))
		{ window.alert("Invalid PIN."); return false; }
	return true;
}
export function ValidatePhone(str) {
	if (str.length == 0)
		{ window.alert("No phone number entered."); return false; }
	let phoneNum = str.substr((str.length > 0 && str[0] == '+' ? 1 : 0));
	if (isNaN(Number(phoneNum))) 
		{ window.alert("Invalid phone number."); return false; }
	return true;
}
export function ValidateEMail(str) {
	let valid = str.match(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
	if (!valid) { window.alert("Invalid email"); }
	return valid;
}
export function ValidateNames(first, last) {
	if (first.length == 0)
		{ window.alert("No first name entered."); return false; }
	if (last.length == 0)
		{ window.alert("No last name entered."); return false; }
	return true;
}
export function ValidateRoles(roleList) {
	if (!roleList[1] && !roleList[2] && !roleList[3])
		{ window.alert("No role chosen"); return false; }
	return true;
}