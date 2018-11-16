import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    public dataForm: FormGroup;
    public fb: any;
    static invalidemail;
    static blankemail;

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute) {
        this.fb = fb;
        SignupComponent.blankemail = false;
        SignupComponent.invalidemail = false;
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            firstname : ['', Validators.required],
            lastname : ['', Validators.required],
            email: ['', Validators.compose([Validators.required, SignupComponent.validateEmail])],
            phoneno : ['', Validators.required],
            living : ['', Validators.required],
            worktype : ['', Validators.required]
        });
    }
    dosubmit(formval) {
        console.log(formval);
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        if(this.dataForm.valid){
            var link = 'https://registerforwebinar.audiodeadline.com/php/democreatereg.php';
            let data = {
                firstname: formval.firstname,
                lastname: formval.lastname,
                email: formval.email,
                phoneno: formval.phoneno,
                living: formval.living,
                worktype: formval.worktype
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    console.log(result);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }

    static validateEmail(control: FormControl) {
        SignupComponent.blankemail = false;
        SignupComponent.invalidemail = false;

        if (control.value == '' || control.value == null) {
            SignupComponent.blankemail = true;
            return {'invalidemail': true};
        }
        if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            SignupComponent.invalidemail = true;
            return {'invalidemail': true};
        }
    }

    getemail(type: any) {
        if (type == 'invalid') {
            return SignupComponent.invalidemail;
        }
        if (type == 'blank') {
            return SignupComponent.blankemail;
        }
    }
}
