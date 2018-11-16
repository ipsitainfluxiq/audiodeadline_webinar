import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
    public dataForm: FormGroup;
    public fb: any;
    static invalidemail;
    static blankemail;
    public popthankyouhomemodal: boolean = false;
    public videomemodal: boolean = false;

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute) {
        this.fb = fb;
        LandingComponent.blankemail = false;
        LandingComponent.invalidemail = false;
    }

    ngOnInit() {
        //noinspection TsLint
        this.dataForm = this.fb.group({
            firstname : ['', Validators.required],
            lastname : ['', Validators.required],
            email: ['', Validators.compose([Validators.required, LandingComponent.validateEmail])],
            phoneno : ['', Validators.required],
            living : ['', Validators.required],
            influencer : [''],
            promoter : [''],
            musician : [''],
            other : ['']
        });
    }
    dosubmit(formval) {
        console.log(4444);
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
                influencer: formval.influencer,
                promoter: formval.promoter,
                musician: formval.musician,
                other: formval.other,
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    console.log(result);
                    if(result.status=='APPROVED'){
                        this.dataForm.reset();
                        this.popthankyouhomemodal = true;
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
callvideo(){
    this.videomemodal = true;
}
    static validateEmail(control: FormControl) {
        LandingComponent.blankemail = false;
        LandingComponent.invalidemail = false;

        if (control.value == '' || control.value == null) {
            LandingComponent.blankemail = true;
            return {'invalidemail': true};
        }
        if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            LandingComponent.invalidemail = true;
            return {'invalidemail': true};
        }
    }

    getemail(type: any) {
        if (type == 'invalid') {
            return LandingComponent.invalidemail;
        }
        if (type == 'blank') {
            return LandingComponent.blankemail;
        }
    }

    onHidden() {
        this.popthankyouhomemodal = false;
        this.videomemodal = false;
    }
}
