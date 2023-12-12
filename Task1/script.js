$(document).ready(function () {

    function validateInput(input, isValid, errorMessage) {
        const error = input.next('.error');

        if (isValid) {
            input.css('border', '2px solid green');
            error.text('');
        } else {
            input.css('border', '2px solid red');
            error.text(errorMessage);
        }
    }

    // check if a string is empty
    function isEmpty(str) {
        return str === undefined || str.trim() === '';
    }
    
    function isValidName(name) {
        return /^[a-zA-Z\-]+$/.test(name);
    }
//FirstName
    $('#fname').on('blur', function () {
        const firstName = $(this).val();
        const isValid = !isEmpty(firstName) && isValidName(firstName);
        validateInput($(this), isValid, 'First Name can\'t be empty, and can only contain alphabets and hyphen');
        toggleIcon($(this), isValid);
    });

    // Last Name
    $('#lname').on('blur', function () {
        const lastName = $(this).val();
        const isValid = !isEmpty(lastName) && isValidName(lastName);
        validateInput($(this), isValid, 'Last Name can\'t be empty, and can only contain alphabets and hyphen');
        toggleIcon($(this), isValid);
    });
    //email
    function isValidEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    }

    $('#email').on('blur', function () {
        const email = $(this).val();
        const isValid = !isEmpty(email) && isValidEmail(email);
        validateInput($(this), isValid, 'Invalid email format. Email should be in the proper format with @gmail.com');
        toggleIcon($(this), isValid);
    });

  //DOB
  function isValidDate(day, month, year) {
    const currentDate = new Date();
    const selectedDate = new Date(year, month - 1, day); // month is 0-indexed, so we subtract 1
    const lastDayOfSelectedMonth = new Date(year, month, 0).getDate();
    
    return !isEmpty(day) && !isEmpty(month) && !isEmpty(year) &&
        !isNaN(selectedDate) && // Check if it's a valid date
        selectedDate <= currentDate && // Check if it's not a future date
        selectedDate >= new Date('1940-01-01') && // Check if it's after a certain date (e.g., 1940-01-01)
        day <= lastDayOfSelectedMonth && // Check if it's a valid day for the selected month
        selectedDate <= currentDate; // Check if it's before or on the current date
}

$('#day, #month, #year').on('change', function () {
    const day = $('#day').val();
    const month = $('#month').val();
    const year = $('#year').val();
    const isValid = isValidDate(day, month, year);
    validateInput($('#day'), isValid, 'Invalid date. Please enter a valid DOB (not in the future and with a valid day for the selected month).');
    toggleIcon($('#day'), isValid);
    toggleErrorMessage(isValid);
});

function toggleErrorMessage(isValid) {
    const errorMessage = $('#dob-error');
    if (isValid) {
        errorMessage.text(''); 
        errorMessage.hide();  
    } else {
        errorMessage.text('Invalid date. Please enter a valid DOB (not in the future and with a valid day for the selected month).');
        errorMessage.show();  
    }
}




function isValidPassoutYear(year) {
    const currentYear = new Date().getFullYear();
    return /^\d{4}$/.test(year) && year >= 2000 && year <= currentYear;
}

$('[name^="edu3"]').on('blur', function () {
    const passoutYear = $(this).val();
    const isValid = isValidPassoutYear(passoutYear);
    validateInput($(this), isValid, 'Invalid passout year (4 digits required, between 2000 and the current year)');
    toggleIcon($(this), isValid);
});


// PinCode
$('#addressFields').on('blur', '#pincode', function () {
    const pincode = $(this).val();
    validateInput($(this), /^\d{6}$/.test(pincode), 'Invalid PIN code (6 digits required)');
});

// PhoneNo.
$('#addressFields').on('blur', '#countrycode', function () {
    const phone = $(this).val();
    validateInput($(this), /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(phone), 'Invalid contact number');
});
function toggleIcon(input, isValid) {
    const icon = input.next('.fa');

    if (isValid) {
       
        icon.removeClass('fa-exclamation-circle error').addClass('fa-check-circle success');
    } else {
        
        icon.removeClass('fa-check-circle success').addClass('fa-exclamation-circle error');
    }
}


function isFilled(field) {
    return !isEmpty(field);
}

// Percentage Marks
$('[name^="edu4"]').on('blur', function () {
    const percentageMarks = $(this).val();
    const isValid = /^\d+(\.\d{1,2})?$/.test(percentageMarks) && percentageMarks > 30 && percentageMarks < 100;
    validateInput($(this), isValid, 'Invalid percentage marks (must be a number > 33 and < 100 with up to 2 decimal places)');
    toggleIcon($(this), isValid);
});

// string contains special characters
    function containsSpecialChars(str) {
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return regex.test(str);
    }

    function isValidSchoolName(schoolName) {
        return !isEmpty(schoolName) && !containsSpecialChars(schoolName);
    }

    function isValidDegree(degree) {
        return !isEmpty(degree) && !containsSpecialChars(degree);
    }

    function isValidAddress(address) {
        return !isEmpty(address) && !containsSpecialChars(address);
    }

    function isValidLocality(locality) {
        return !isEmpty(locality) && !containsSpecialChars(locality);
    }
   
    // School Name
    $('#schoolName').on('blur', function () {
        const schoolName = $(this).val();
        const isValid = isValidSchoolName(schoolName);
        validateInput($(this), isValid, 'School Name can\'t be empty and can\'t contain special characters');
    });

    // Degree
    $('#degree').on('blur', function () {
        const degree = $(this).val();
        const isValid = isValidDegree(degree);
        validateInput($(this), isValid, 'Degree can\'t be empty and can\'t contain special characters');
    });

    // Address
    $('#address').on('blur', function () {
        const address = $(this).val();
        const isValid = isValidAddress(address);
        validateInput($(this), isValid, 'Address can\'t be empty and can\'t contain special characters');
    });

    // Locality
    $('#locality').on('blur', function () {
        const locality = $(this).val();
        const isValid = isValidLocality(locality);
        validateInput($(this), isValid, 'Locality can\'t be empty and can\'t contain special characters');
    });
    //Gender
    $('.gender-radio').on('change', function () {
        const errorMessage = $("#genderError");
        if (!$('.gender-radio:checked').length) {
            errorMessage.text("Please select a gender.");
            errorMessage.show();
        } else {
            errorMessage.text(""); // Clear the error message
            errorMessage.hide();
        }
    });

    // Form submission
    $('#validateBtn').on('click', function (e) {
        e.preventDefault();

        //valid before submitting
        const isValidForm = !isEmpty($('#fname').val()) &&
            !isEmpty($('#lname').val()) &&
            /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test($('#countrycode').val()) &&  $('input[name="gender"]').is(':checked')&&
            /\S+@\S+\.\S+/.test($('#email').val()) &&
            $('#day').val() !== '' && $('#month').val() !== '' && $('#year').val() !== '';

        if (isValidForm) {
            alert('Form submitted successfully');
            saveData()
        } else {
            alert('Please fill in all required fields.');
        }
    });
    if ($('.gender-radio:checked').length === 0) {
        $("#genderError").text("Please select a gender.");
        $("#genderError").show();
    } else {
        $("#genderError").text(""); // Clear the error message
        $("#genderError").hide();
    }

   // Add Address button
   $('#addAddress').on('click', function () {
    const addressRow = $('.address-row').first().clone();
    addressRow.find('input').val('');
    addressRow.find('input').css('border', '2px solid red'); 
    addressRow.appendTo('#addressFields');
});

// Add Education button
$('#addEducation').on('click', function () {
    const educationRow = $('.education-row').first().clone();
    educationRow.find('input').val('');
    educationRow.find('input').css('border', '2px solid red'); 
    educationRow.appendTo('#educationFields');
});


});





function saveData() {
     
    const formData = new FormData(document.getElementById('frm'));

  
    const data = {
        aboutMe: formData.get('about'),
        firstName: formData.get('firstname'),
        lastName: formData.get('lastname'),
        dateOfBirth: `${formData.get('year')}-${formData.get('month')}-${formData.get('day')}`,
        skills: [],
        gender: formData.get('gender'),
        email: formData.get('email'),
        address: [],
        education: [],
    };

    const skills = document.querySelectorAll('input[id^="txt_"]');
    skills.forEach(skillInput => {
        const skillValue = skillInput.value;
        const skillId = skillInput.id.split('_')[1]; 
        const levelInput = document.getElementById('level_' + skillId);
    
        if (skillValue.trim() !== '') {
            data.skills.push({
                language: skillValue,
                level: levelInput ? parseInt(levelInput.value) : 1, 
            });
        }
    });
    


    const addressFields = document.querySelectorAll('.address-row');
    addressFields.forEach(field => {
        const street = field.querySelector('input[name="address[]"]').value;
        const locality = field.querySelector('input[name="address1[]"]').value;
        const pinCode = field.querySelector('input[name="address2[]"]').value;
        const phoneNo = field.querySelector('input[name="address3[]"]').value;

        if (street || locality || pinCode || phoneNo) {
            data.address.push({
                street: street,
                locality: locality,
                pinCode: pinCode,
                PhoneNo: phoneNo,
            });
        }
    });


    const educationFields = document.querySelectorAll('.education-row');
    educationFields.forEach(field => {
        const schoolName = field.querySelector('input[name="edu1[]"]').value;
        const degree = field.querySelector('input[name="edu2[]"]').value;

        const passoutYearInput = field.querySelector('input[name="edu3[]"]');
        const passoutYear = passoutYearInput ? passoutYearInput.value : '';

        const percentageMarks = field.querySelector('input[name="edu4[]"]').value;

        if (schoolName || degree || passoutYear || percentageMarks) {
            data.education.push({
                schoolName: schoolName,
                degree: degree,
                passoutYear: passoutYear,
                percentageMarks: parseFloat(percentageMarks),
            });
        }
    });

   let id = "15df46f5df1a09216772";
    fetch('https://api.npoint.io/'+id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            console.log('Data saved successfully!');
            // Clear the form fields
            // document.getElementById('frm').reset();
            window.location.href = "output.html?id="+id;
        })
        .catch(error => {
            alert('Error: ' + error);
        });
}




$(document).ready(function () {
  
    $(".add").click(function () {
        var total_element = $(".element").length;
        var lastid = $(".element:last").attr("id");
        var split_id = lastid.split("_");
        var nextindex = Number(split_id[1]) + 1;
        var max = 5;

        if (total_element < max) {
            var skillValue = $("#txt_" + nextindex).val();
            var skillLevel = $("#level_" + nextindex).val();


            $(".element:last").after("<div class='element' id='div_" + nextindex + "'></div>");
            $("#div_" + nextindex).append("<input type='text' placeholder='Enter your skill' id='txt_" + nextindex + "'>");
            $("#div_" + nextindex).append("<input type='range' id='level_" + nextindex + "' min='1' max='5' step='1'>");
            $("#div_" + nextindex).append("&nbsp;<span id='remove_" + nextindex + "' class='remove'>X</span>");
        }
    });

  
    $('.container').on('click', '.remove', function () {
        var id = this.id;
        var split_id = id.split("_");
        var deleteindex = split_id[1];
        $("#div_" + deleteindex).remove();
    });
});


const daySelect = document.getElementById("day");
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        daySelect.appendChild(option);
    }

    // month options
    const monthSelect = document.getElementById("month");
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = months[i - 1];
        monthSelect.appendChild(option);
    }

    // year options
    const yearSelect = document.getElementById("year");
    for (let i = 1940; i <= new Date().getFullYear(); i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        yearSelect.appendChild(option);
    }
 // Function to add a new address row
 function addAddressRow(button) {
    var addressFields = document.getElementById('addressFields');
    var newAddressRow = document.createElement('div');
    newAddressRow.className = 'address-row';
    newAddressRow.innerHTML = document.querySelector('.address-row').innerHTML;
    addressFields.appendChild(newAddressRow);
    
    // Disable the "Add Address" button after clicking
    button.disabled = true;
}

// Function to add a new education row
function addEducationRow(button) {
    var educationFields = document.getElementById('educationFields');
    var newEducationRow = document.createElement('div');
    newEducationRow.className = 'education-row';
    newEducationRow.innerHTML = document.querySelector('.education-row').innerHTML;
    educationFields.appendChild(newEducationRow);
    
    // Disable the "Add Education" button after clicking
    button.disabled = true;
}

