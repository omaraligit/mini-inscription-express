
$(document).ready(function () {
    $('#date_de_naissance').datetimepicker({
        format:"DD/MM/YYYY"
    });
});

var app = new Vue({
    el: '#app',
    data: {
        nom:"",
        prenom:"",
        date_de_naissance:"",
        telephone:"",
        sexe:"H",
        pays:"M",
        alertError:"",
        serverResponse:""
    },
    mounted() {
        
    },
    methods: {
        closeDateTimePicker: function (event) {
            $('#date_de_naissance')[0].dispatchEvent(new CustomEvent('input'));
        },
        checkForm: function (e) {
            // prevent form submition axios will do it
            // we can add more validation here 
            // e has access to all inputs of the form
            
            e.preventDefault();
        },
        SaveMember: function(event) {
            
            // Send a POST request
            axios({
                method: 'POST',
                url: 'http://127.0.0.1:3000/new/member',
                data: this.$data
            })
            .then(response => {
                this.$data.alertError="";
                console.log(response);
                this.$data.serverResponse = "member bien ajouter avec id " + response.data.id
            })
            .catch(error => {
                
                if (error.response.status == 400) {
                    this.$data.serverResponse = "";
                    this.$data.alertError=error.response.data.error
                }
                if (error.response.status == 422) {
                    errors = ""
                    for (const [key, value] of Object.entries(error.response.data.error)) {
                        errors += ` ${key}: ${value}, `;
                    }
                    this.$data.alertError=errors
                }
            });
            
        },
        saveFileOfMembers: function (e) {
            
            var formData = new FormData();
            var imagefile = document.querySelector('#membersfile');
            formData.append("membersfile", imagefile.files[0]);
            axios.post('http://127.0.0.1:8000/new/members-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                
                this.$data.alertError="";
                console.log(response);
                this.$data.serverResponse = "member bien ajouter avec les id " + JSON.stringify(response.data)
            })
            .catch(error => {
                if (error.response.status == 400) {
                    this.$data.serverResponse = "";
                    this.$data.alertError=error.response.data.error
                }
            });
        }
    }
})