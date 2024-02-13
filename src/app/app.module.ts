import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserComponent} from './users/user/user.component';
import {HttpClientModule} from "@angular/common/http";
import {UsersComponent} from './users/users.component';
import {AddUserFormComponent} from './users/user/add-user-form/add-user-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalModule} from 'ngx-bootstrap/modal';
import {UserModalComponent} from './users/user/user-modal/user-modal.component';
import {VocabulariesComponent} from './vocabularies/vocabularies.component';
import {Route, RouterModule} from "@angular/router";
import {ImgFallbackModule} from 'ngx-img-fallback';
import { HeaderComponent } from './header/header.component';
import { VocabularyModalComponent } from './vocabularies/vocabulary/vocabulary-modal/vocabulary-modal.component';
import { AddVocabularyFormComponent } from './vocabularies/vocabulary/add-vocabulary-form/add-vocabulary-form.component';
import { TranslationComponent } from './translations/translation/translation/translation.component';
import { TranslationDeepLComponent } from './translations/translation-deep-l/translation-deep-l.component';
import { RoleDisplayNamePipe } from './pipes/role-display-name.pipe';
import { LoginComponent } from './login/login.component';


const routes: Route[] = [
  {path: 'users', component: UsersComponent, canActivate: []},
  {path: 'vocabularies', component: VocabulariesComponent, canActivate: []},
  {path: 'translation-deep-l', component: TranslationDeepLComponent, canActivate: []},
  {path: 'login', component: LoginComponent, canActivate: []},
  {path: '**', redirectTo: '/vocabularies'}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    AddUserFormComponent,
    UserModalComponent,
    VocabulariesComponent,
    HeaderComponent,
    VocabularyModalComponent,
    AddVocabularyFormComponent,
    TranslationComponent,
    TranslationDeepLComponent,
    RoleDisplayNamePipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    ImgFallbackModule,
    ReactiveFormsModule,
    // NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
