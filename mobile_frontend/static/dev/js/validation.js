/**
 * Created by colin on 30/12/13.
 */
function addValidationRules(obsType) {
    if(obsType == "NEWS"){
        $("#obsData_body_temperature").rules("add", {
            min: 27.1,
            max: 44.9,
            pimpedNumber: true,
            messages:{
                min: "Temperature too low (degrees Celsius)",
                max: "Temperature too high (degrees Celsius)",
                pimpedNumber: "Value must be a number"
            }
        });
        $("#obsData_respiration_rate").rules("add", {
            min: 1,
            max: 59,
            pimpedDigits: true,
            messages:{
                min: "Respiratory rate too low",
                max: "Respiratory rate too high" ,
                pimpedDigits: "Value must be a whole number"
            }
        });
        $("#obsData_indirect_oxymetry_spo2").rules("add", {
            min: 51,
            max: 100,
            pimpedDigits: true,
            messages:{
                min: "O2 saturation too low",
                max: "O2 saturation too high",
                pimpedDigits: "Value must be a whole number"
            }
        });
        $("#obsData_pulse_rate").rules("add", {
            min: 1,
            max: 250,
            pimpedDigits: true,
            messages: {
                min: "Heart rate too low",
                max: "Heart rate too high",
                pimpedDigits: "Value must be a whole number"
            }
        });
        $("#obsData_diastolicBP").rules("add", {
            min: 1,
            max: 280,
            pimpedDigits: true,
            lessThan: '#obsData_blood_pressure_systolic',
            messages:{
                min: "Diastolic BP too low",
                max: "Diastolic BP too high",
                pimpedDigits: "Value must be a whole number",
                lessThan: "Diastolic must be less than systolic"
            }
        });
        $("#obsData_blood_pressure_systolic").rules("add", {
            min: 1,
            max: 300,
            pimpedDigits: true,
            greaterThan: '#obsData_diastolicBP',
            messages:{
                min: "Systolic BP too low",
                max: "Systolic BP too high",
                pimpedDigits: "Value must be a whole number",
                greaterThan: "Systolic must be greater than diastolic"
            }
        });

        $("#obsData_supplementaryO2_O2Device").rules("add", {
            required: false
        });
        $("#obsData_supplementaryO2_parameters_flow").rules("add", {
            pimpedNumber: true,
            required: false,
            min: 0,
            messages:{
                pimpedNumber: "Value must be a number",
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_concentration").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_cpapPeep").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_nivBackupRate").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_nivIpap").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_nivEpap").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
    }

    if(obsType == "BTUHMEWS"){

        $("#obsData_body_temperature").rules("add", {
            min: 27.1,
            max: 44.9,
            pimpedNumber: true,
            messages:{
                min: "Temperature too low (degrees Celsius)",
                max: "Temperature too high (degrees Celsius)",
                pimpedNumber: "Value must be a number"
            }
        });



        console.log("after temp");

        $("#obsData_respiration_rate").rules("add", {
            min: 1,
            max: 59,
            pimpedDigits: true,
            messages:{
                min: "Respiratory rate too low",
                max: "Respiratory rate too high" ,
                pimpedDigits: "Value must be a whole number"
            }
        });



        console.log("after resps");
        $("#obsData_indirect_oxymetry_spo2").rules("add", {
            min: 51,
            max: 100,
            pimpedDigits: true,
            messages:{
                min: "O2 saturation too low",
                max: "O2 saturation too high",
                pimpedDigits: "Value must be a whole number"
            }
        });



        console.log("after o2");

        $("#obsData_pulse_rate").rules("add", {
            min: 1,
            max: 250,
            pimpedDigits: true,
            messages: {
                min: "Heart rate too low",
                max: "Heart rate too high",
                pimpedDigits: "Value must be a whole number"
            }
        });



        console.log("after pulse");


        $("#obsData_diastolicBP").rules("add", {
            min: 1,
            max: 280,
            pimpedDigits: true,
            lessThan: '#obsData_blood_pressure_systolic',
            messages:{
                min: "Diastolic BP too low",
                max: "Diastolic BP too high",
                pimpedDigits: "Value must be a whole number",
                lessThan: "Diastolic must be less than systolic"
            }
        });



        console.log("after dia");

        $("#obsData_blood_pressure_systolic").rules("add", {
            min: 1,
            max: 300,
            pimpedDigits: true,
            greaterThan: '#obsData_diastolicBP',
            messages:{
                min: "Systolic BP too low",
                max: "Systolic BP too high",
                pimpedDigits: "Value must be a whole number",
                greaterThan: "Systolic must be greater than diastolic"
            }
        });

        $("#obsData_supplementaryO2_O2Device").rules("add", {
            required: false
        });
        $("#obsData_supplementaryO2_parameters_flow").rules("add", {
            pimpedNumber: true,
            required: false,
            min: 0,
            messages:{
                pimpedNumber: "Value must be a number",
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_concentration").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_cpapPeep").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_nivBackupRate").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_nivIpap").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_nivEpap").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });

    }


    if(obsType == "MEWS"){
        $("#obsData_body_temperature").rules("add", {
            min: 27.1,
            max: 44.9,
            messages:{
                min: "Temperature too low (degrees Celsius)",
                max: "Temperature too high (degrees Celsius)",
                pimpedNumber: "Value must be a number"
            },
            pimpedNumber: true,
            required: false
        });
        $("#obsData_respiration_rate").rules("add", {
            min: 1,
            max: 59,
            pimpedDigits: true,
            required: false,
            messages:{
                min: "Respiratory rate too low",
                max: "Respiratory rate too high",
                pimpedDigits: "Value must be a whole number"
            }
        });
        $("#obsData_pulse_rate").rules("add", {
            min: 1,
            max: 250,
            pimpedDigits: true,
            required: false,
            messages: {
                min: "Heart rate too low",
                max: "Heart rate too high",
                pimpedDigits: "Value must be a whole number"
            }
        });
        $("#obsData_pulseType").rules("add", {
           required: false
        });
        $("#obsData_blood_pressure_systolic").rules("add", {
            min: 1,
            max: 300,
            pimpedDigits: true,
            required: false,
            greaterThan: '#obsData_diastolicBP',
            messages:{
                min: "Systolic BP too low",
                max: "Systolic BP too high",
                pimpedDigits: "Value must be a whole number",
                greaterThan: "Systolic must be greater than diastolic"
            }
        });
        $("#obsData_diastolicBP").rules("add", {
            min: 1,
            max: 280,
            pimpedDigits: true,
            required: false,
            lessThan: '#obsData_blood_pressure_systolic',
            messages:{
                min: "Diastolic BP too low",
                max: "Diastolic BP too high",
                pimpedDigits: "Value must be a whole number",
                lessThan: "Diastolic must be less than systolic"
            }
        });
        $("#obsData_consciousnessToggle").rules("add", {
           required: false
        });
        $("#obsData_urine").rules("add", {
            min: 1,
            max: 3,
            number: true,
            required: false
        });
        $("#obsData_avpu_text").rules("add", {
            required: false
        });
        $("#obsData_eyes").rules("add", {
            required: false
        });
        $("#obsData_verbal").rules("add", {
            required: false
        });
        $("#obsData_motor").rules("add", {
            required: false
        });

        $("#obsData_indirect_oxymetry_spo2").rules("add", {
            min: 51,
            max: 100,
            mewsO2: true,
            pimpedDigits: true,
            required: false,
            messages:{
                min: "O2 saturation too low",
                max: "O2 saturation too high",
                pimpedDigits: "Value must be a whole number"
            }
        });
        $("#obsData_supplementaryO2_O2Device").rules("add", {
           required: false
        });
        $("#obsData_supplementaryO2_parameters_flow").rules("add", {
            pimpedNumber: true,
            required: false,
            min: 0,
            messages:{
                pimpedNumber: "Value must be a number",
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_concentration").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_cpapPeep").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_nivBackupRate").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_nivIpap").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
        $("#obsData_supplementaryO2_parameters_nivEpap").rules("add", {
            required: false,
            min: 0,
            messages:{
                min: "Value too low"
            }
        });
    }

    if(obsType == "GCS"){
        $("#gcsData_eyes").rules("add", {
            required: false
        });
        $("#gcsData_verbal").rules("add", {
            required: false
        });
        $("#gcsData_motor").rules("add", {
            required: false
        });
    }

    if(obsType == "STOOL"){
        $("#stoolsData_bowelOpen").rules("add",{
            required: false
        });
        $("#stoolsData_nausea").rules("add",{
            required: false
        });
        $("#stoolsData_vomiting").rules("add",{
            required: false
        });
        $("#stoolsData_quantity").rules("add",{
            required: false
        });
        $("#stoolsData_colour").rules("add",{
            required: false
        });
        $("#stoolsData_bristolType").rules("add",{
            required: false
        });
        $("#stoolsData_offensive").rules("add", {
            required: false
        });
        $("#stoolsData_strain").rules("add",{
            required: false
        });
        $("#stoolsData_laxatives").rules("add", {
            required: false
        });
        $("#stoolsData_samples").rules("add", {
            required: false
        });
        $("#stoolsData_rectalExam").rules("add", {
            required: false
        });
    }

    if(obsType == "BLOODS"){
        $("#bloodSugarData_bloodSugar").rules("add", {
            min: 1.0,
            max: 99.9,
            pimpedNumber: true,
            messages:{
                min: "Blood sugar too low",
                max: "Blood sugar too high",
                pimpedNumber: "Value must be a number"
            }
        });
    }

    if(obsType == "WEIGHT"){
        $("#heightWeightData_height").rules("add", {
            pimpedNumber: true,
            required: false,
            messages:{
                pimpedNumber: "Value must be a number"
            }
        });
        $("#heightWeightData_weight").rules("add", {
            pimpedNumber: true,
            messages:{
                pimpedNumber: "Value must be a number"
            }
        });
    }

    if(obsType == "BLOODP"){
        $("#BloodProductData_volume").rules("add", {
            pimpedNumber: true,
            messages:{
                pimpedNumber: "Value must be a number"
            }
        })
    }
}

function resetErrors(el, mode){
    // if delete the actually remove the element
    if(mode == "delete"){
        $("#"+el).parent().parent(".obsField").removeClass("error");
        $("#"+el).parent().siblings(".input-body").children(".errors").children("label.error").remove();

        //$(".obsField").removeClass("error");
        //$(".obsField label.error").remove();

        // if empty then just empty the error text
    }else if(mode == "empty"){
        $("#"+el).parent().parent(".obsField").removeClass("error");
        $("#"+el).parent().parent().find(".errors").text("");
    }else{
        return false;
    }
}

function showErrors(errors){
    $.each(errors, function(k,v){
        var id = k.replace(/\./g, "_");$("#"+id).parent().parent().addClass("error");$("#"+id).parent().parent().find(".input-body .errors").text(v);
    });
}