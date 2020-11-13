/**
 * Copyright 2015-2019 OpenCB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import { LitElement, html } from 'lit-element'; // bare import by name doesn't work yet in browser,
// see: https://www.polymer-project.org/blog/2018-02-26-3.0-preview-paths-and-names
import {LitElement, html} from "/web_modules/lit-element.js";
import "./welcome.js";
import "./about.js";
import "./contact.js";
import "./faq.js";
import "./terms.js";
import "./getting-started.js";
import "./opencga-breadcrumb.js";
import "./category-page.js";
import "./iva-profile.js";
import "./iva-settings.js";
// import "./progress-bar.js";

// @dev[jsorolla]
import {OpenCGAClient} from "../lib/jsorolla/src/core/clients/opencga/opencga-client.js";
import {CellBaseClient} from "../lib/jsorolla/src/core/clients/cellbase/cellbase-client.js";
import {ReactomeClient} from "../lib/jsorolla/src/core/clients/reactome/reactome-client.js";

import UtilsNew from "../lib/jsorolla/src/core/utilsNew.js";
import NotificationUtils from "../lib/jsorolla/src/core/NotificationUtils.js";
import {NotificationQueue} from "../lib/jsorolla/src/core/webcomponents/Notification.js";
import AnalysisRegistry from "../lib/jsorolla/src/core/webcomponents/variant/analysis/analysis-registry.js";
import "../lib/jsorolla/src/core/webcomponents/clinical/opencga-clinical-analysis-browser.js";
import "../lib/jsorolla/src/core/webcomponents/variant/opencga-variant-browser.js";
import "../lib/jsorolla/src/core/webcomponents/variant/variant-beacon.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/opencga-gene-view.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/opencga-transcript-view.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/opencga-protein-view.js";
import "../lib/jsorolla/src/core/webcomponents/user/opencga-projects.js";
import "../lib/jsorolla/src/core/webcomponents/sample/opencga-sample-browser.js";
import "../lib/jsorolla/src/core/webcomponents/sample/opencga-sample-view.js";
import "../lib/jsorolla/src/core/webcomponents/sample/sample-variant-stats-browser.js";
import "../lib/jsorolla/src/core/webcomponents/sample/sample-cancer-variant-stats-browser.js";
import "../lib/jsorolla/src/core/webcomponents/file/opencga-file-browser.js";
import "../lib/jsorolla/src/core/webcomponents/family/opencga-family-browser.js";
import "../lib/jsorolla/src/core/webcomponents/user/opencga-login.js";
import "../lib/jsorolla/src/core/webcomponents/individual/opencga-individual-browser.js";
import "../lib/jsorolla/src/core/webcomponents/cohort/opencga-cohort-browser.js";
import "../lib/jsorolla/src/core/webcomponents/job/opencga-job-browser.js";
import "../lib/jsorolla/src/core/webcomponents/job/opencga-job-view.js";
import "../lib/jsorolla/src/core/webcomponents/clinical/opencga-clinical-portal.js";
import "../lib/jsorolla/src/core/webcomponents/clinical/opencga-clinical-analysis-browser.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-gwas-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-sample-variant-stats-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-cohort-variant-stats-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-mutational-signature-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-sample-elegibility-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-knockout-analysis-result.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-inferred-sex-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-individual-relatedness-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-individual-mendelian-error-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-sample-qc-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-individual-qc-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-family-qc-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-plink-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-gatk-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-variant-exporter-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-variant-stats-exporter-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/interpretation/variant-interpreter-browser-rd.js";
import "../lib/jsorolla/src/core/webcomponents/variant/interpretation/variant-interpreter-browser-cancer.js";
import "../lib/jsorolla/src/core/webcomponents/variant/interpretation/variant-interpreter.js";
import "../lib/jsorolla/src/core/webcomponents/clinical/analysis/opencga-rd-tiering-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/clinical/opencga-clinical-analysis-writer.js";
import "../lib/jsorolla/src/core/webcomponents/file/opencga-file-manager.js";
import "../lib/jsorolla/src/core/webcomponents/job-monitor.js";
import "../lib/jsorolla/src/core/webcomponents/loading-spinner.js";
// import "./loading-bar.js";

// import "../lib/jsorolla/src/core/webcomponents/alignment/analysis/opencga-alignment-stats-analysis.js";
// /@dev


class IvaApp extends LitElement {

    constructor() {
        super();
        this._init();
    }

    createRenderRoot() {
        return this;
    }

    static get properties() {
        return {
            opencgaSession: {
                type: Object
            },
            // sample: {
            //     type: Array
            // },
            // studySummaries: {
            //     type: Array
            // },
            // tool: {
            //     type: String
            // },
            // cellbaseClient: {
            //     type: Object
            // },
            config: {
                type: Object
            }
        };
    }

    /**
     * This function creates all the initial configuration
     * @private
     */
    _init() {

        // Create the 'config' , this objects contains all the different configuration
        const _config = application;
        _config.menu.counter = 0;
        _config.cellbase = cellbase;
        _config.tools = tools;
        _config.opencga = opencga;
        // _config.species = DEFAULT_SPECIES;
        _config.enabledComponents = {};
        // _config.panelExamples = diseasePanels;
        _config.populationFrequencies = populationFrequencies;
        _config.proteinSubstitutionScores = proteinSubstitutionScore.style;
        _config.consequenceTypes = consequenceTypes;

        // We can customise which components are active by default, this improves the first loading time.
        _config.enabledComponents.home = true;

        // Enable tools reading the configuration
        for (const tool in _config.tools) {
            if (UtilsNew.isNotUndefinedOrNull(_config.tools[tool].active)) {
                _config.enabledComponents[tool] = _config.tools[tool].active;
            }
        }

        // console.log("this.config.enabledComponents",_config.enabledComponents)
        const components = [
            "home",
            "about",
            "contact",
            "terms",
            "faq",
            "gettingstarted",
            "login",
            "settings",
            "account",
            "projects",
            "file-manager",
            // "beacon",
            "project",
            "sample",
            "file",
            "sample",
            "sample-view",
            "individual",
            "cohort",
            "clinicalAnalysis",
            "clinicalAnalysisPortal",
            "clinicalAnalysisCreator",
            "settings",
            "gene",
            "transcript",
            "protein",
            "sample-grid",
            "browser",
            "family",
            "job",
            "cat-browser",
            "cat-analysis",
            "cat-clinical",
            "cat-catalog",
            "cat-alignment",
            "cat-ga4gh",
            // Sample
            "sampleVariantStatsBrowser",
            "sampleCancerVariantStatsBrowser",
            // Variant
            "eligibility",
            "gwas",
            "sample-variant-stats",
            "cohort-variant-stats",
            "sample-eligibility",
            "knockout",
            "knockout-result",
            "inferred-sex",
            "mutational-signature",
            "individual-relatedness",
            "mendelian-errors",
            "plink",
            "gatk",
            "variant-exporter",
            "variant-stats-exporter",
            // Quality Control
            "sample-qc",
            "individual-qc",
            "family-qc",
            // Clinical
            "clinical-analysis-writer",
            "interpreter",
            "rd-tiering",
            // Alignment
            "alignment-index",
            "alignment-stats",
            "coverage-index",
            "job-view"];

        for (const component of components) {
            _config.enabledComponents[component] = false;
        }

        // We set the global Polymer variable, this produces one single event
        this.config = _config;


        // TODO do we need this?
        // We deep clone some config sections for having a default initial copy, this allows us to reset config.
        /* this.defaultConfig = {};
        if (UtilsNew.isNotUndefined(populationFrequencies)) {
            this.defaultConfig.populationFrequencies = JSON.parse(JSON.stringify(populationFrequencies));
        }
        if (UtilsNew.isNotUndefined(proteinSubstitutionScore.style)) {
            this.defaultConfig.proteinSubstitutionScores = JSON.parse(JSON.stringify(proteinSubstitutionScore.style));
        }
        if (UtilsNew.isNotUndefined(consequenceTypes)) {
            this.defaultConfig.consequenceTypes = JSON.parse(JSON.stringify(consequenceTypes));
        }*/


        // We need to listen to hash fragment changes to update the display and breadcrumb
        const _this = this;
        window.onhashchange = function (e) {
            // e.preventDefault();
            _this.hashFragmentListener(_this);
        };

        // Remember the tool that was previously set
        this.tool = window.location.hash.split("/")[0];
        if (UtilsNew.isEmpty(this.tool)) {
            this.tool = "#home";
        }

        // Go to the page that tool has
        if (window.location.hash !== this.tool) {
            window.location.hash = this.tool;
        }


        // Other initialisations
        this.icd10 = ICD_10;
        this._isBreadcrumbVisible = false;
        // This manages the sample selected in each tool for updating the breadcrumb
        this.samples = [];
        this._samplesPerTool = {};


        // TODO remove browserSearchQuery
        this.browserSearchQuery = {};
        // keeps track of the executedQueries transitioning from browser tool to facet tool
        this.queries = [];

        globalThis.addEventListener("signingIn", e => {
            this.signingIn = e.detail.value;
            this.requestUpdate();
        }, false);

    }

    connectedCallback() {
        super.connectedCallback();
        new NotificationQueue().setContext(this);

        // Initialise clients and create the session
        // this.opencgaClientConfig = new OpenCGAClientConfig(this.config.opencga.host, this.config.opencga.version, true, this.config.opencga.cookie.prefix);
        // this.opencgaClientConfig.serverVersion = this.config.opencga.serverVersion;
        const sid = Cookies.get(this.config.opencga.cookie.prefix + "_sid");
        const userId = Cookies.get(this.config.opencga.cookie.prefix + "_userId");
        this.opencgaClient = new OpenCGAClient({
            host: this.config.opencga.host,
            version: this.config.opencga.version,
            token: sid,
            userId: userId,
            cookies: {active: true, prefix: this.config.opencga.cookie.prefix},
            // TODO remove this soon!
            serverVersion: this.config.opencga.serverVersion
        });

        // this.cellBaseClientConfig = new CellBaseClientConfig(this.config.cellbase.hosts, this.config.cellbase.version, "hsapiens");
        this.cellbaseClient = new CellBaseClient({
            hosts: this.config.cellbase.hosts,
            version: this.config.cellbase.version,
            species: "hsapiens"
        });

        console.log("cellbaseClient iva-app", this.cellbaseClient);

        this.reactomeClient = new ReactomeClient();

        if (UtilsNew.isNotEmpty(sid)) { // && !this._publicMode
            // this.opencgaClient._config.token = sid;
            this._createOpenCGASession();
            // This must happen after creating the OpencgaClient
            this.checkSessionActive();
            this.intervalCheckSession = setInterval(this.checkSessionActive.bind(this), this.config.session.checkTime);
        } else {
            this._createOpencgaSessionFromConfig();
        }
    }

    updated(changedProperties) {
        if (changedProperties.has("opencgaSession")) {
            this.opencgaSessionObserver();
        }
    }


    opencgaSessionObserver() {
        this.renderHashFragments();
        this.queries = {};
        this.requestUpdate();
    }

    async _createOpenCGASession() {
        this.signingIn = "Creating session..";
        await this.requestUpdate();
        const _this = this;
        const opencgaSession = this.opencgaClient.createSession()
            .then(response => {
                console.log("_createOpenCGASession", response);
                // check if project array has been defined in the config.js
                if (UtilsNew.isNotEmptyArray(_this.config.opencga.projects)) {
                    // We store the project and study ids the user needs to visualise (defined in the config.js)
                    const configProjects = {};
                    for (let i = 0; i < _this.config.opencga.projects.length; i++) {
                        configProjects[_this.config.opencga.projects[i].id] = [];

                        for (let j = 0; j < _this.config.opencga.projects[i].studies.length; j++) {
                            configProjects[_this.config.opencga.projects[i].id].push(
                                _this.config.opencga.projects[i].studies[j].id
                            );
                        }
                    }

                    // We must keep only the projects defined in the configuration file
                    const activeProjects = [];
                    for (let i = 0; i < response.projects.length; i++) {
                        if (response.projects[i].id in configProjects) {
                            const project = response.projects[i];
                            const activeStudies = [];
                            for (let j = 0; j < project.studies.length; j++) {
                                const study = project.studies[j];
                                if (configProjects[project.id].indexOf(study.id) > -1) {
                                    activeStudies.push(study);
                                }
                            }

                            // We replace the studies obtained with the ones from the configuration file
                            project.studies = activeStudies;
                            activeProjects.push(project);
                        }
                    }

                    // TODO we must query projects/info URL to get the whole object
                    response.projects = activeProjects || [];
                    if (UtilsNew.isNotEmptyArray(response.projects[0].studies)) {
                        response.project = response.projects[0];
                        response.study = response.projects[0].studies[0];
                    }
                }
                // this forces the observer to be executed.
                this.opencgaSession = Object.assign({}, response);
                this.opencgaSession.mode = _this.config.mode;
                this.config.menu = [...application.menu];
                this.config = {..._this.config};
            })
            .catch(e => {
                UtilsNew.notifyError(e);
            }).finally(() => {
                this.signingIn = false;
                this.requestUpdate();
            });
    }

    // TODO turn this into a Promise
    _createOpencgaSessionFromConfig() {
        // Create a private opencga-session to avoid calling to the Observer
        const opencgaSession = this.opencgaClient.createAnonymousSession();

        // If 'config.opencga.anonymous' exists and contains either 'user' or 'projects'
        if (UtilsNew.isNotUndefinedOrNull(this.config.opencga.anonymous) && Object.keys(this.config.opencga.anonymous).length > 0) {
            // If 'projects' is defined we only load those projects
            if (UtilsNew.isNotUndefinedOrNull(this.config.opencga.anonymous.projects)) {
                if (this.config.opencga.anonymous.projects.length > 0) {
                    // TODO we must query projects/info URL to get the whole object
                    opencgaSession.projects = this.config.opencga.anonymous.projects;
                    if (UtilsNew.isNotEmptyArray(opencgaSession.projects[0].studies)) {
                        opencgaSession.project = opencgaSession.projects[0];
                        opencgaSession.study = opencgaSession.projects[0].studies[0];
                    }
                }

                // This triggers the event and call to opencgaSessionObserver
                this.opencgaSession = opencgaSession;
            } else {
                // When no 'projects' is defined we fetch all public projects
                if (UtilsNew.isNotUndefinedOrNull(this.config.opencga.anonymous.user)) {
                    this.opencgaClient.users().projects(this.config.opencga.anonymous.user, {})
                        .then(restResponse => {
                            // _this._setup(_projects);

                            opencgaSession.projects = restResponse.response[0].result;
                            if (UtilsNew.isNotEmptyArray(opencgaSession.projects) && UtilsNew.isNotEmptyArray(opencgaSession.projects[0].studies)) {
                                // this sets the current active project and study
                                opencgaSession.project = opencgaSession.projects[0];
                                opencgaSession.study = opencgaSession.projects[0].studies[0];
                            }

                            // This triggers the event and call to opencgaSessionObserver
                            this.opencgaSession = opencgaSession;
                        })
                        .catch(function (response) {
                            console.log("An error when getting projects");
                            console.log(response);
                        });
                }
            }
        } else {
            // This triggers the event and call to opencgaSessionObserver
            this.opencgaSession = opencgaSession;
        }
    }

    onLogin(credentials) {
        // This creates a new authenticated opencga-session object

        console.log("iva-app: roger I'm in", credentials);
        this.opencgaClient._config.token = credentials.detail.token;
        this._createOpenCGASession();

        if (this.tool === "#login") {
            this.tool = "#home";
        }

        // 60000 ms = 1 min. Every 1 min we check if session is close to expire.
        this.intervalCheckSession = setInterval(this.checkSessionActive.bind(this), this.config.session.checkTime);
    }

    refresh() {
        this.opencgaClient.refresh();
    }

    async logout() {
        // this delete token in the client and removes the Cookies
        await this.opencgaClient.logout();
        this._createOpencgaSessionFromConfig();

        this.config.menu = [...application.menu];

        this.tool = "#home";
        window.location.hash = "home";
        window.clearInterval(this.intervalCheckSession);
    }

    onUrlChange(e) {
        let hashFrag = e.detail.id;
        if (UtilsNew.isNotUndefined(this.opencgaSession.project) && UtilsNew.isNotEmpty(this.opencgaSession.project.alias)) {

            hashFrag += "/" + this.opencgaSession.project.alias;
            if (UtilsNew.isNotUndefined(this.opencgaSession.study) && UtilsNew.isNotEmpty(this.opencgaSession.study.alias)) {
                hashFrag += "/" + this.opencgaSession.study.alias;
            }
        }

        const myQueryParams = [];
        for (const key in e.detail.query) {
            myQueryParams.push(key + "=" + e.detail.query[key]);
        }
        if (myQueryParams.length > 0) {
            hashFrag += `?${myQueryParams.join("&")}`;
        }

        window.location.hash = hashFrag;
    }

    checkSessionActive() {
        let _message = "";
        // We check if refresh token has updated session id cookie
        // let sid = Cookies.get(this.config.opencga.cookie.prefix + "_sid");

        if (UtilsNew.isNotUndefinedOrNull(this.opencgaClient._config.token)) { // UtilsNew.isNotEmpty(this.opencgaSession.token) &&
            // this.token = sid;
            const decoded = jwt_decode(this.opencgaClient._config.token);
            const currentTime = new Date().getTime();
            const remainingTime = ((decoded.exp * 1000) - currentTime);
            // 600000 ms = 10 min = 1000(1sec) * 60(60 sec = 1min) * 10(10 min)
            if (remainingTime <= this.config.session.maxRemainingTime && remainingTime >= this.config.session.minRemainingTime) {
                const remainingMinutes = Math.floor(remainingTime / this.config.session.minRemainingTime);

                // _message = html`Your session is close to expire. <strong>${remainingMinutes} minutes remaining</strong> <a href="javascript:void 0" @click="${() => this.notifySession.refreshToken()}"> Click here to refresh </a>`
                new NotificationQueue().pushRemainingTime(remainingMinutes, this.opencgaClient);

            } else {
                // TODO remove NotificationUtils
                if (remainingTime < this.config.session.minRemainingTime) {
                    _message = "Your session has expired.";
                    this.logout();
                    window.clearInterval(this.intervalCheckSession);
                } else {
                    if (UtilsNew.isNotUndefinedOrNull(this.notifySession)) {
                        NotificationUtils.closeNotify(this.notifySession);
                    }
                    return;
                }
            }
        } else {
            // _message = "Your session has expired.";
            // window.clearInterval(this.intervalCheckSession);
        }
        // delay = 0 to fix the notify until user closes it.
        if (UtilsNew.isNotEmpty(_message)) {
            this.notifySession = NotificationUtils.showNotify(_message, UtilsNew.MESSAGE_INFO,
                {}, {
                    delay: 0,
                    onClosed: this.onCloseRefreshNotify.bind(this)
                }, this.opencgaClient, this.notifySession);
        }
    }

    onCloseRefreshNotify() {
        delete this.notifySession;
    }

    changeTool(e) {
        e.preventDefault();
        const target = e.currentTarget;
        $(".navbar-inverse ul > li", this).removeClass("active");
        $(target).parent("li").addClass("active");
        if ($(target).closest("ul").hasClass("dropdown-menu")) {
            $(target).closest("ul").closest("li").addClass("active");
        }

        if (UtilsNew.isNotUndefined(e)) {
            e.preventDefault(); // prevents the hash change to "#" and allows to manipulate the hash fragment as needed
        }

        if (UtilsNew.isNotUndefined(target) && UtilsNew.isNotUndefined(target.attributes.href)) {
            //                    $(e.target.attributes.href.value).show(); // get the href and use it find which div to show
            this.tool = target.attributes.href.value;
            if (UtilsNew.isNotUndefinedOrNull(this._samplesPerTool)) {
                if (this._samplesPerTool.hasOwnProperty(this.tool.replace("#", ""))) {
                    this.samples = this._samplesPerTool[this.tool.replace("#", "")];
                } else {
                    this.samples = [];
                }
            }
            // this.renderBreadcrumb()
        } else {
            this.tool = "#home";
        }

        this.renderHashFragments();
    }

    renderHashFragments() {
        console.log("renderHashFragments - DEBUG", this.tool);
        let hashFrag = this.tool;
        if (this.opencgaSession?.project?.alias) {

            hashFrag += "/" + this.opencgaSession.project.id;
            if (UtilsNew.isNotUndefined(this.opencgaSession.study) && UtilsNew.isNotEmpty(this.opencgaSession.study.alias)) {
                hashFrag += "/" + this.opencgaSession.study.id;
            }
        }

        if (window.location.hash === hashFrag) {
            // debugger
            this.hashFragmentListener(this);
        } else {
            // debugger
            window.location.hash = hashFrag;
        }

    }

    hashFragmentListener(ctx) {
        console.log("hashFragmentListener - DEBUG", this.tool);
        // Hide all elements
        for (const element in this.config.enabledComponents) {
            if (UtilsNew.isNotUndefined(this.config.enabledComponents[element])) {
                this.config.enabledComponents[element] = false;
            }
        }

        let arr = window.location.hash.split("/");

        // TODO evaluate refactor
        const [hashTool, hashProject, hashStudy, feature] = arr;

        // Stopping the recursive call
        if (hashTool !== this.tool || (this.opencgaSession?.project && hashProject !== this.opencgaSession.project.alias) ||
            (UtilsNew.isNotUndefined(this.study) && hashStudy !== this.opencgaSession.study.alias)) {
            if (arr.length > 1) {
                // Field 'project' is being observed, just in case Polymer triggers
                // an unnecessary event we can check they are really different
                if (ctx.opencgaSession?.project?.alias && ctx.opencgaSession.project.alias !== hashProject) {
                    ctx.opencgaSession.project.alias = hashProject;
                }
                if (ctx.opencgaSession?.study && arr.length > 2 && ctx.opencgaSession.study !== hashStudy) {
                    for (let i = 0; i < ctx.opencgaSession.projects.length; i++) {
                        if (ctx.opencgaSession.projects[i].name === ctx.opencgaSession.project.name ||
                            ctx.opencgaSession.projects[i].alias === ctx.opencgaSession.project.alias) {
                            for (let j = 0; j < ctx.opencgaSession.projects[i].studies.length; j++) {
                                if (ctx.opencgaSession.projects[i].studies[j].name === hashStudy || ctx.opencgaSession.projects[i].studies[j].alias === hashStudy) {
                                    ctx.opencgaSession.study = ctx.opencgaSession.projects[i].studies[j];
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
            }

            switch (hashTool) {
                case "#browser":
                    this.browserSearchQuery = Object.assign({}, this.browserSearchQuery);
                    break;
                case "#protein":
                    break;
                case "#interpreter":
                    this.clinicalAnalysisId = feature;
                    break;
                case "#sampleVariantStatsBrowser":
                case "#sampleCancerVariantStatsBrowser":
                    this.sampleId = feature;
                    break;
            }


            if (UtilsNew.isNotEmpty(feature)) {
                if (hashTool === "#protein") {
                    ctx.protein = feature;
                } else if (feature.startsWith("ENST")) {
                    ctx.transcript = feature;
                } else {
                    ctx.gene = feature;
                }
            }
            ctx.tool = hashTool;
        }

        const searchArr = window.location.hash.split("?");
        if (searchArr.length > 1) {
            const search = searchArr[1];
            arr = search.split("&");
            const query = {};
            for (let i = 0; i < arr.length; i++) {
                const split = arr[i].split("=");
                query[split[0]] = split[1];
            }
            this.query = query;
        }

        if (UtilsNew.isNotUndefined(this.config.enabledComponents[this.tool.replace("#", "")])) {
            // debugger
            this.config.enabledComponents[this.tool.replace("#", "")] = true;
        }

        // debugger
        this.config = {...this.config};
        // TODO quickfix to avoid hash browser scroll
        $("body,html").animate({
            scrollTop: 0
        }, 1);
    }

    onStudySelect(e) {
        e.preventDefault(); // prevents the hash change to "#" and allows to manipulate the hash fragment as needed
        const {study, project} = e.target.dataset;
        const newProject = this.opencgaSession.projects.find(p => p.id === project);
        const newStudy = newProject.studies.find(s => s.id === study);
        this.opencgaSession = {...this.opencgaSession, project: newProject, study: newStudy};
    }

    updateProject(e) {
        this.project = this.projects.find(project => project.name === e.detail.project.name);
        this.tool = "#project";
        this.renderHashFragments();
        // this.renderBreadcrumb();
    }

    updateStudy(e) {
        if (UtilsNew.isNotUndefined(e.detail.project) && UtilsNew.isNotEmpty(e.detail.project.name)) {
            this.project = e.detail.project;
        }
        this.study = this.project.studies.find(study => study.name === e.detail.study.name || study.alias === e.detail.study.alias);

        //                TODO: Opencga study will be shown later. For now variant browser is shown when the study changes
        //                this.tool = "studyInformation";
        this.tool = "#browser";
        this.renderHashFragments();
        // this.renderBreadcrumb();
    }

    onSampleChange(e) {
        if (UtilsNew.isNotUndefinedOrNull(this.samples) && UtilsNew.isNotUndefinedOrNull(e.detail)) {
            this.samples = e.detail.samples;
            this._samplesPerTool[this.tool.replace("#", "")] = this.samples;
            // this.renderBreadcrumb();
        }
    }

    buildQuery(e) {
        const query = {};
        let value = "";
        // TODO searchTextBox is not used anymore. Remove related code
        if (UtilsNew.isNotUndefined(e) && UtilsNew.isNotUndefined(e.detail.value)) {
            value = e.detail.value; // It takes care of the fired event from welcome.html
        } else if (UtilsNew.isNotUndefined(e) && e.keyCode === "13" || UtilsNew.isNotUndefined(e) && e.type === "click") {
            value = this.querySelector("#" + searchTextBox).value; // When enter key is pressed or search icon is clicked, it takes the value entered and assign it
        }

        if (value !== "") {
            if (value.startsWith("rs") || value.split(":").length > 2) {
                query.ids = value;
            } else if (value.indexOf(":") > -1 && value.indexOf("-") > -1) {
                query.region = value;
            } else if (value.startsWith("GO:")) {
                query["annot-go"] = value;
            } else if (value.startsWith("HP:")) {
                query["annot-hpo"] = value;
            } else if (value.startsWith("ENST")) {
                this.transcript = value;
                this.tool = "#transcript";
            } else {
                this.gene = value.toUpperCase();
                this.tool = "#gene";
            }

            // This query object is built for variant browser. Only when the queries to browser are made, we are setting the tool to browser
            if (Object.keys(query).length > 0) {
                this._query = query;
                this.tool = "#browser";
            }

            this.renderHashFragments();
            // TODO convert in LitElement compliant
            this.$.searchTextBox.value = ""; // Empty the value of search text box when search is complete and respective view is loaded
        }
    }

    /*onQuickSearch(e) {
        const gene = PolymerUtils.getValue("searchTextBox");
        if (UtilsNew.isNotUndefinedOrNull(this.tool)) {
            const _query = {
                xref: gene
            };
            switch (this.tool) {
                case "#browser":
                    window.location.hash = "browser/" + this.opencgaSession.project.id + "/" + this.opencgaSession.study.id;
                    this.browserSearchQuery = _query;
                    break;
                case "#interpretation":
                    window.location.hash = "interpretation/" + this.opencgaSession.project.id + "/" + this.opencgaSession.study.id;
                    this.interpretationSearchQuery = _query;
                    break;
                default:
                    this.tool = "#browser";
                    window.location.hash = "browser/" + this.opencgaSession.project.id + "/" + this.opencgaSession.study.id;
                    this.browserSearchQuery = _query;
                    break;
            }
        }
        // debugger
    }
*/
    quickSearch(e) {
        // debugger
        this.tool = "#browser";
        window.location.hash = "browser/" + this.opencgaSession.project.id + "/" + this.opencgaSession.study.id;
        // this.browserQuery = {xref: e.detail.value};

        this.browserSearchQuery = e.detail;
    }

    quickFacetSearch(e) {
        console.log("IVA-APP quickfacetsearch");
        this.tool = "#facet";
        window.location.hash = "facet/" + this.opencgaSession.project.id + "/" + this.opencgaSession.study.id;
        // this.browserQuery = {xref: e.detail.value};
        this.browserSearchQuery = e.detail;
    }

    onJobSelected(e) {
        this.jobSelected = e.detail.jobId;
        this.requestUpdate();
    }

    // TODO remove
    onNotifyMessage(e) {
        // NotificationUtils.closeNotify(this.notifySession);
        // NotificationUtils.showNotify(e.detail.message, e.detail.type, e.detail.options, e.detail.settings);
        new NotificationQueue().push(e.detail.title, e.detail.message, e.detail.type);
    }

    // TODO this should keep in sync the query object between variant-browser and variant-facet
    onQueryChange(e) {
        console.log("onQueryChange", e);
        this.browserSearchQuery = {...e.detail.query};
    }


    onQueryFilterSearch(e, source) {
        // FIXME filters component emits a event containing {detail:{query:Object}} while active-filter emits {detail:{Object}}
        // TODO fix active-filters
        const q = e.detail.query ? {...e.detail.query} : {...e.detail};
        this.queries[source] = {...q};
        this.queries = {...this.queries};
        // console.log("this.queries",this.queries);
        this.requestUpdate();
    }

    onSelectClinicalAnalysis(e) {
        this.clinicalAnalysis = e.detail.clinicalAnalysis;
    }

    /* Set the width of the side navigation to 250px */
    openNav() {
        this.querySelector("#side-nav").style.width = "250px";
        console.log("open");
    }

    /* Set the width of the side navigation to 0 */
    closeNav() {
        this.querySelector("#side-nav").style.width = "0";
    }

    toggleSideNav(e) {
        e.preventDefault();
        const sidenav = this.querySelector("#side-nav");
        $("#side-nav").toggleClass("active");
        $("#overlay").toggleClass("active");
    }

    isVisible(item) {
        switch (item.visibility) {
            case "public":
                return true;
            case "private":
                return !!this?.opencgaSession?.token;
            case "none":
            default:
                return false;
        }
    }

    isLoggedIn() {
        return !!this?.opencgaSession?.token;
    }

    render() {
        return html`
            <style>                
                .navbar-inverse {
                    background-color: var(--main-bg-color);
                }
                .navbar-inverse .navbar-nav>.open>a, .navbar-inverse .navbar-nav>.open>a:focus, .navbar-inverse .navbar-nav>.open>a:hover {
                    background-color: var(--main-bg-color-darker);
                    /*filter: brightness(0.8); this involves text as well..*/ 
                }
                .navbar-inverse .navbar-nav>.active>a, .navbar-inverse .navbar-nav>.active>a:focus, .navbar-inverse .navbar-nav>.active>a:hover {
                    background-color: var(--main-bg-color-darker);
                }
                .navbar-inverse .navbar-nav>li>a {
                    color: #d2d2d2;
                }
                .navbar-inverse .dropdown-menu>.active>a, .navbar-inverse .dropdown-menu>.active>a:focus, .navbar-inverse .dropdown-menu>.active>a:hover {
                    background-color: var(--main-bg-color);
                }
                                
                .navbar-nav li.notification > a > i {
                    font-size: 20px;
                    position: absolute;
                    left: 10px;
                    top: 13px;
                }
                
                .navbar-nav li.user-menu > a {
                    padding-left: 40px;                
                }
    
                .navbar-nav li.user-menu > a > i {
                    font-size: 25px;
                    position: absolute;
                    left: 10px;
                    top: 13px;
                }
                
                .study-switcher + .dropdown-menu a[data-study]{
                }
                
                .notification-nav {
                    margin-right: 0;
                }
                
                .notification-nav > li > a .badge  {
                    position: relative;
                    z-index: 10;
                    bottom: -7px;
                    left: 11px;
                    background-color: #41a7ff;
                }
                
                .center {
                   margin: auto;
                   text-align: justify;
                   width: 60%;
                   font-size: 18px;
                   color: #797979;
                }
                
                .feature-view {
                    margin: auto;
                    text-align: justify;
                    width: 90%;
                }
                .search-box-wrapper .form-control{
                    border-right-width: 0;                   
                }
                .search-box-wrapper .input-group-addon{
                    background: #fff;
                    cursor: pointer;
                }
                .search-box-wrapper .input-group-addon:hover{
                    background: #eee;
                }
                #searchTextBox {
                    width: 100px;
                }
                
                #login {
                    display: flex;
                    align-items: center; 
                    justify-content: center;
                }
               
                            
                /* The side navigation menu */
                #side-nav {
                    position: fixed;
                    z-index: 1002;
                    top: 0; 
                    left: -250px;
                    background-color: #fff; 
                    overflow-x: hidden;
                    padding-top: 20px; 
                    width: 250px;
                    visibility: hidden;
                    /*transform: translate(-250px);*/                
                    height: 100vh;
                    transform-origin: top left;
                    animation-duration: .3s;
                    animation-timing-function: ease;
                    animation-name: slideOutFrames
                }
                
                #side-nav.active {
                    left: 0px;
                    visibility: visible;
                    animation-name: slideInFrames
                }  
                
                #side-nav .iva-logo {
                    font-size: 5px;
                    text-align: center;
                    margin-top: 30px;
                }
                
                #side-nav .nav a {
                    padding: 6px 1px 6px 1px;
                    text-decoration: none;
                    color: #818181;
                    display: block;
                    transition: 0.3s;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: .2em;
                }
                
                #side-nav .nav a:hover {            
                    color: #204d74;
                }
    
                #side-nav .closebtn {
                    position: absolute;
                    top: 0;
                    right: 25px;
                    font-size: 36px;
                    margin-left: 50px;
                    padding:0;
                    z-index: 99;
                }
                
                #side-nav a.closebtn:hover {        
                    background: transparent;
                    text-decoration: none;
                    color: black;
                }
                
                #side-nav a > img,
                #side-nav a > i {
                    width:48px
                }
                
                #side-nav .nav a.sidebar-nav-login {
                    padding: 20px 0;
                }
                
                
    
                /*#progress-bar {
                    width: 100%;
                    position: fixed;
                    height: 3px;
                    background: #41a7ff;
                    z-index: 10;
                    transition: width 2s ease-in-out, opacity 0.5s ease;
                }*/
            </style>

            <loading-bar></loading-bar>
            <div id="overlay" @click="${this.toggleSideNav}"></div>
            <div id="side-nav" class="sidenav shadow-lg">
                <a href="javascript:void(0)" class="closebtn" @click="${this.toggleSideNav}">&times;</a>
                <nav class="navbar" id="sidebar-wrapper" role="navigation">
                    <a href="#home" @click="${e => {this.toggleSideNav(e); this.changeTool(e);}}">
                        <div class="iva-logo">
                            <img src="./img/iva.svg" />
                            <span class="subtitle">Interactive Variant Analysis</span>
                        </div>
                    </a>
                    <ul class="nav sidebar-nav">
                        ${!this.isLoggedIn() ? html`
                            <li>
                                <a href="#login" class="text-center sidebar-nav-login" role="button" @click="${e => {this.toggleSideNav(e); this.changeTool(e);}}">
                                    <i href="#login" class="fa fa-3x fa-sign-in-alt fa-lg icon-padding" aria-hidden="true"></i>Login
                                </a>
                            </li>
                        ` : null }
                        ${this.config?.menu?.filter?.(this.isVisible).map(item => html`
                            <li>
                                <a href="#cat-${item.id}" role="button" @click="${e => {this.toggleSideNav(e); this.changeTool(e);}}">
                                    <img src="img/tools/icons/${item.icon}" alt="${item.title}"/>  ${item.title}
                                </a>
                             </li>
                        `)}
                    </ul>
                </nav>
            </div>
            <nav class="navbar navbar-inverse main-navbar">
                <div>
                    <ul class="nav navbar-nav">
                        <li>
                            <a href="#" @click="${this.toggleSideNav}" id="waffle-icon-wrapper">
                               <div id="waffle-icon"></div>
                            </a>
                        </li>
                    </ul>

                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        ${this.config.companyLogo ? html`
                            <a href="#home" class="navbar-brand company-logo" @click="${this.changeTool}">
                                <img src="${this.config.companyLogo}" alt="logo">
                            </a>
                        ` : null}
                        <a class="navbar-brand iva-logo-white" href="#home" id="home-nav" @click="${this.changeTool}">
                            <img src="img/iva-white.svg" alt="logo"> <b><sup>${this.config.version}</sup></b>
                        </a>
                    </div>
                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <!-- Controls aligned to the LEFT -->
                        <ul class="nav navbar-nav">
                            <!-- This code parse the config menu arrays and creates a custom menu taking into account visibility -->
                            ${this.config?.menu?.filter?.(this.isVisible).map(item => html`
                                <!-- If there is not submenu we just display a button -->
                                ${!item.submenu ? html`
                                    <li>
                                        <a href="#${item.id}" role="button" @click="${this.changeTool}">${item.title}</a>
                                    </li>` : html`
                                    <!-- If there is a submenu we create a dropdown menu item -->
                                    <li class="dropdown">
                                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                            ${item.title} <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu">
                                            ${item.submenu.map(subitem =>
                                                subitem.category ? html`
                                                    <li><a class="nav-item-category" href="${subitem.id ? "#" + subitem.id : "javascript: void 0"}">${subitem.title}</a></li>
                                                ` : subitem.separator ? html`
                                                    <li role="separator" class="divider"></li>
                                                ` : html`
                                                <li><a href="#${subitem.id}" @click="${this.changeTool}" data-id="${subitem.id}">${subitem.title}</a></li>
                                            `)}
                                        </ul>
                                    </li>`
                                }`
                            )}
                        </ul>
                        
                        <!-- Controls aligned to the RIGHT: settings and about-->
                        <ul class="nav navbar-nav navbar-right">
                            <!--Studies dropdown and Search menu-->
                            ${this.opencgaSession && this.opencgaSession.projects && this.opencgaSession.projects.length ? html`
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle study-switcher" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <div><i class="fa fa-database fa-lg" style="padding-right: 10px"></i></div>
                                        <div style="margin-right: 5px">
                                            <p class="project-name">${this.opencgaSession.project.id}</p>
                                            <p class="study-id">${this.opencgaSession.study.name}</p>
                                        </div>
                                        <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        ${this.opencgaSession.projects.map(project => html`
                                            <li><a title="${project.fqn}"><b>${project.name} [${project.fqn.split("@")[0]}]</b></a></li>
                                            ${project.studies && project.studies.length && project.studies.map(study => html`
                                                <li>
                                                    <a href="#" data-study="${study.id}" data-project="${project.id}" title="${study.fqn}" @click="${this.onStudySelect}">${study.name}</a>
                                                </li>
                                            `)}                                            
                                        `)}
                                    </ul>
                                </li>
                                <li class="separator"></li>
                            ` : null}
                                                        
                            <!-- Jobs -->
                            ${this.isVisible(this.config.jobMonitor) ? html`
                                <job-monitor .opencgaSession="${this.opencgaSession}" @jobSelected="${this.onJobSelected}"></job-monitor>
                            ` : null}
                            
                            <!--Search menu-->
                            ${this.opencgaSession && this.opencgaSession.projects && this.config.search.visible ? html`
                                    <form class="navbar-form navbar-left" role="search">
                                        <div class="form-group">
                                            <div class="input-group search-box-wrapper">
                                                <input class="form-control" id="searchTextBox" placeholder="${this.config.search.placeholder}" @input="${this.buildQuery}">
                                                <span class="input-group-addon"><span class="fa fa-search" aria-hidden="true" @click="${this.onQuickSearch}"></span></span>
                                            </div>
                                        </div>
                                    </form>
                            ` : null}
                            
                            ${this.isVisible(this.config.fileExplorer) ? html`
                                <li>
                                    <a href="#file-manager" title="File Manager" role="button" @click="${this.changeTool}">
                                        <i class="fas fa-folder-open icon-padding"></i>
                                    </a>
                                </li>
                                <li class="separator"></li>
                            ` : null }
                            
                            
                            <!-- About dropdown menu-->
                            ${this.config.about.dropdown ? html`
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-question-circle fa-lg" style="padding-right: 10px"></i>About <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        ${this.config.about.links && this.config.about.links.map(link => html`
                                            <li>
                                                <a href="${link.url}" target="_blank"><i class="${link.icon} icon-padding" aria-hidden="true"></i> ${link.name}</a>
                                            </li>
                                        `)}
                                    </ul>
                                </li>
                            ` : this.config.about.links && this.config.about.links.map(link => html`
                                <li>
                                    <a href="#${link.id}" role="button" @click="${this.changeTool}">${link.name}</a>
                                </li>
                            `) }

                            <!-- Login/Logout button -->
                            ${this.config.login.visible && !this.isLoggedIn() ? html`
                                <li class="dropdown">
                                    <a href="#login" id="loginButton" role="button" @click="${this.changeTool}">
                                        <i href="#login" class="fa fa-sign-in-alt fa-lg icon-padding" aria-hidden="true"></i>Login
                                    </a>
                                </li>
                            ` : null}

                            <!--User-->
                            ${this.isLoggedIn() ? html`
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-user-circle fa-lg icon-padding" aria-hidden="true"></i>${this.opencgaSession.user?.name ?? this.opencgaSession.user?.email} <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        ${this.config.userMenu.length ? this.config.userMenu.filter(item => this.isVisible(item)).map(item => html`
                                            <li>
                                                <a href="${item.url}"><i class="${item.icon} icon-padding" aria-hidden="true"></i> ${item.name}</a>
                                            </li>
                                        `) : null }
                                        <li role="separator" class="divider"></li>
                                        <li>
                                            <a id="logoutButton" role="button" @click="${this.logout}">
                                                <i class="fa fa-sign-out-alt icon-padding" aria-hidden="true"></i> Logout
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            ` : null}
                        </ul>
                        
                        
                    </div>
                </div>
            </nav>
            <!-- End of navigation bar -->
            ${this.signingIn ? html`
                    <div class="login-overlay"><loading-spinner .description="${this.signingIn}"></loading-spinner></div>
            ` : null}
            <!--<div class="alert alert-info">${JSON.stringify(this.queries)}</div>--> 

            <!-- ${JSON.stringify(this.config.enabledComponents)} -->
            <!-- This is where main IVA application is rendered -->
            <div class="container-fluid">
                ${this.config.enabledComponents.home ? html`
                    <div class="content" id="home">
                        <welcome-web .opencgaSession="${this.opencgaSession}" version="${this.config.version}" .cellbaseClient=${this.cellbaseClient} @search="${this.quickSearch}" .config="${this.config}"> </welcome-web>
                    </div>
                ` : null}

                ${this.config.enabledComponents.about ? html`
                    <div class="content" id="about">
                        <about-web version="${this.config.version}"></about-web>
                    </div>
                ` : null}

                ${this.config.enabledComponents.terms ? html`
                    <div class="content" id="terms">
                        <terms-web version="${this.config.version}"></terms-web>
                    </div>
                ` : null}

                ${this.config.enabledComponents.contact ? html`
                    <div class="content" id="contact">
                        <contact-web version="${this.config.version}"></contact-web>
                    </div>
                ` : null}

                ${this.config.enabledComponents.faq ? html`
                <div class="content" id="faq">
                    <faq-web version="${this.config.version}"></faq-web>
                </div>
                ` : null}

                ${this.config.enabledComponents.gettingstarted ? html`
                <div class="content" id="getting-started">
                    <getting-started .opencgaSession="${this.opencgaSession}" .config="${this.config}"></getting-started>
                </div>
                ` : null}
                
                ${this.config.enabledComponents.login ? html`
                    <div class="content" id="login">
                        <opencga-login  .opencgaSession="${this.opencgaSession}"
                                        loginTitle="Sign in"
                                        .notifyEventMessage="${this.config.notifyEventMessage}"
                                        @login="${this.onLogin}">
                        </opencga-login>
                    </div>
                ` : null}

                ${this.config.enabledComponents.browser ? html`
                    <div class="content" id="browser">
                        <opencga-variant-browser .opencgaSession="${this.opencgaSession}"
                                                .cellbaseClient="${this.cellbaseClient}"
                                                .reactomeClient="${this.reactomeClient}"
                                                .query="${this.queries.variant}"
                                                .config="${OpencgaVariantBrowserConfig}"
                                                .populationFrequencies="${this.config.populationFrequencies}"
                                                .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
                                                .consequenceTypes="${this.config.consequenceTypes}"
                                                @onGene="${this.geneSelected}"
                                                @onSamplechange="${this.onSampleChange}"
                                                @querySearch="${e => this.onQueryFilterSearch(e, "variant")}"
                                                @activeFilterChange="${e => this.onQueryFilterSearch(e, "variant")}"
                                                @facetSearch="${this.quickFacetSearch}">
                        </opencga-variant-browser>
                    </div>                
                ` : null}

                ${this.config.enabledComponents["clinicalAnalysisPortal"] ? html`
                    <div class="content" id="clinicalAnalysisPortal">
                        <!--
                        <opencga-clinical-portal .opencgaSession="${this.opencgaSession}"
                                                .config="${OpencgaClinicalPortalConfig}"
                                                .cellbaseClient="${this.cellbaseClient}">
                        </opencga-clinical-portal>
                        -->
                        <tool-header title="${"Case Review"}" icon="${"fas fa-window-restore"}"></tool-header>
                        <opencga-clinical-review-cases  .opencgaSession="${this.opencgaSession}"></opencga-clinical-review-cases>
                    </div>
                ` : null}

                ${this.config.enabledComponents["rd-interpreter"] ? html`
                    <div class="content" id="rd-interpreter">
                        <variant-rd-interpreter .opencgaSession="${this.opencgaSession}"
                                                        .cellbaseClient="${this.cellbaseClient}"
                                                        .clinicalAnalysisId="${this.clinicalAnalysisId}"
                                                        .query="${this.interpretationSearchQuery}"
                                                        .populationFrequencies="${this.config.populationFrequencies}"
                                                        .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
                                                        .consequenceTypes="${this.config.consequenceTypes}"
                                                        .config="${true}"
                                                        @gene="${this.geneSelected}"
                                                        @samplechange="${this.onSampleChange}">
                        </variant-rd-interpreter>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["cancer-interpreter"] ? html`
                    <div class="content" id="cancer-interpreter">
                        <variant-cancer-interpreter .opencgaSession="${this.opencgaSession}"
                                                        .cellbaseClient="${this.cellbaseClient}"
                                                        .clinicalAnalysisId="${this.clinicalAnalysisId}"
                                                        .query="${this.interpretationSearchQuery}"
                                                        .populationFrequencies="${this.config.populationFrequencies}"
                                                        .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
                                                        .consequenceTypes="${this.config.consequenceTypes}"
                                                        @gene="${this.geneSelected}"
                                                        @samplechange="${this.onSampleChange}">
                        </variant-cancer-interpreter>
                    </div>
                ` : null}

                ${this.config.enabledComponents.beacon ? html`
                    <div class="content" id="beacon">
                        <variant-beacon .opencgaSession="${this.opencgaSession}">
                        </variant-beacon>
                    </div>
                ` : null}

                ${this.config.enabledComponents.genomeBrowser ? html`
                    <div class="content" id="genomeBrowser">
                        <opencga-genome-browser .opencgaSession="${this.opencgaSession}"
                                                .cellbaseClient="${this.cellbaseClient}"
                                                .opencgaClient="${this.opencgaClient}">
                        </opencga-genome-browser>
                    </div>
                ` : null}

                ${this.config.enabledComponents.projects ? html`
                    <div class="content" id="projects">
                        <opencga-projects  .opencgaSession="${this.opencgaSession}"
                                           @project="${this.updateProject}"
                                           @study="${this.updateStudy}">
                        </opencga-projects>
                    </div>
                ` : null}

                ${this.config.enabledComponents.sample ? html`
                    <div class="content" id="sample">
                        <opencga-sample-browser .opencgaSession="${this.opencgaSession}"
                                                .query="${this.queries.sample}"
                                                .config="${OpencgaSampleBrowserConfig}"
                                                @querySearch="${e => this.onQueryFilterSearch(e, "sample")}"
                                                @activeFilterChange="${e => this.onQueryFilterSearch(e, "sample")}">
                        </opencga-sample-browser>
                    </div>
                ` : null}

                ${this.config.enabledComponents.panel ? html`
                    <div class="content" id="panel">
                        <opencga-panel-browser  .opencgaSession="${this.opencgaSession}"
                                                .opencgaClient="${this.opencgaClient}"
                                                .cellbaseClient="${this.cellbaseClient}"
                                                .eventNotifyName="${this.config.notifyEventMessage}"
                                                @notifymessage="${this.onNotifyMessage}">
                        </opencga-panel-browser>
                    </div>
                ` : null}

                ${this.config.enabledComponents.file ? html`
                    <div class="content" id="file">
                        <opencga-file-browser   .opencgaSession="${this.opencgaSession}"
                                                .query="${this.queries.file}"
                                                .config="${OpencgaFileBrowserConfig}"
                                                @querySearch="${e => this.onQueryFilterSearch(e, "file")}"
                                                @activeFilterChange="${e => this.onQueryFilterSearch(e, "file")}">
                        </opencga-file-browser>
                    </div>
                ` : null}

                <!--todo check-->
                ${this.config.enabledComponents.gene ? html`
                    <div class="content" id="gene">
                        <opencga-gene-view .opencgaSession="${this.opencgaSession}"
                                           .cellbaseClient="${this.cellbaseClient}"
                                           .geneId="${this.gene}"
                                           .populationFrequencies="${this.config.populationFrequencies}"
                                           .consequenceTypes="${this.config.consequenceTypes}"
                                           .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
                                           .config="${this.config.tools.gene}"
                                           .summary="${this.config.opencga.summary}"
                                           @querySearch="${e => this.onQueryFilterSearch(e, "variant")}">
                        </opencga-gene-view>
                    </div>
                ` : null}

                ${this.config.enabledComponents["sample-view"] ? html`
                    <div class="content" id="sample-view">
                        <opencga-sample-view    .opencgaSession="${this.opencgaSession}"
                                                .config="${this.config.sampleView}">
                        </opencga-sample-view>
                    </div>
                ` : null}


                ${this.config.enabledComponents.transcript ? html`
                    <div class="content feature-view" id="transcript">
                        <opencga-transcript-view .opencgaSession="${this.opencgaSession}"
                                                 .cellbaseClient="${this.cellbaseClient}"
                                                 .opencgaClient="${this.opencgaClient}"
                                                 .transcript="${this.transcript}"
                                                 .gene="${this.gene}"
                                                 .populationFrequencies="${this.config.populationFrequencies}"
                                                 .consequenceTypes="${this.config.consequenceTypes}"
                                                 .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
                                                 .config="${this.config.tools.gene}">
                        </opencga-transcript-view>
                    </div>
                ` : null}

                ${this.config.enabledComponents.protein ? html`
                    <div class="content feature-view" id="protein">
                        <opencga-protein-view .opencgaSession="${this.opencgaSession}"
                                              .cellbaseClient="${this.cellbaseClient}"
                                              .opencgaClient="${this.opencgaClient}"
                                              .project="${this.opencgaSession.project}"
                                              .study="${this.opencgaSession.study}"
                                              .protein="${this.protein}"
                                              .populationFrequencies="${this.config.populationFrequencies}"
                                              .consequenceTypes="${this.config.consequenceTypes}"
                                              .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
                                              .config="${this.config.tools.gene.protein}">
                        </opencga-protein-view>
                    </div>
                ` : null}

                ${this.config.enabledComponents.individual ? html`
                    <div class="content" id="individual">
                        <opencga-individual-browser .opencgaSession="${this.opencgaSession}"
                                                    .query="${this.queries.individual}"
                                                    .config="${OpencgaIndividualBrowserConfig}"
                                                    @querySearch="${e => this.onQueryFilterSearch(e, "individual")}"
                                                    @activeFilterChange="${e => this.onQueryFilterSearch(e, "individual")}">
                        </opencga-individual-browser>
                    </div>
                ` : null}

                ${this.config.enabledComponents.family ? html`
                    <div class="content" id="family">
                        <opencga-family-browser .opencgaSession="${this.opencgaSession}"
                                                .query="${this.queries.family}"
                                                .config="${OpencgaFamilyBrowserConfig}"
                                                @querySearch="${e => this.onQueryFilterSearch(e, "family")}"
                                                @activeFilterChange="${e => this.onQueryFilterSearch(e, "family")}">                                        
                        </opencga-family-browser>
                    </div>
                ` : null}

                ${this.config.enabledComponents.cohort ? html`
                    <div class="content" id="cohort">
                        <opencga-cohort-browser     .opencgaSession="${this.opencgaSession}"
                                                    .query="${this.queries.cohort}"
                                                    .config="${OpencgaCohortBrowserConfig}"
                                                    @querySearch="${e => this.onQueryFilterSearch(e, "cohort")}"
                                                    @activeFilterChange="${e => this.onQueryFilterSearch(e, "cohort")}"
                        </opencga-cohort-browser>
                    </div>
                ` : null}

                ${this.config.enabledComponents.clinicalAnalysis ? html`
                    <div class="content" id="clinicalAnalysis">
                        <opencga-clinical-analysis-browser      .opencgaSession="${this.opencgaSession}"
                                                                .config="${OpencgaClinicalAnalysisBrowserConfig}"
                                                                .query="${this.queries["clinical-analysis"]}"
                                                                @querySearch="${e => this.onQueryFilterSearch(e, "clinical-analysis")}"
                                                                @activeFilterChange="${e => this.onQueryFilterSearch(e, "clinical-analysis")}">  
                        </opencga-clinical-analysis-browser>
                    </div>
                ` : null}

                ${this.config.enabledComponents.job ? html`
                    <div class="content" id="job">
                        <opencga-job-browser   .opencgaSession="${this.opencgaSession}"
                                                .config="${OpencgaJobBrowserConfig}"
                                                .query="${this.queries.job}"
                                                @querySearch="${e => this.onQueryFilterSearch(e, "job")}"
                                                @activeFilterChange="${e => this.onQueryFilterSearch(e, "job")}">  
                        </opencga-job-browser>
                    </div>
                ` : null}

                ${this.config.enabledComponents["cat-browser"] ? html`
                    <div class="content" id="cat-browser">
                        <category-page .opencgaSession="${this.opencgaSession}" .config="${this.config.menu.find(item => item.id === "browser")}">
                        </category-page>
                    </div>
                ` : null}

                ${this.config.enabledComponents["cat-analysis"] ? html`
                    <div class="content" id="cat-analysis">
                        <category-page .opencgaSession="${this.opencgaSession}" .config="${this.config.menu.find(item => item.id === "analysis")}">
                        </category-page>
                    </div>
                ` : null}

                ${this.config.enabledComponents["cat-clinical"] ? html`
                    <div class="content" id="cat-clinical">
                        <category-page .opencgaSession="${this.opencgaSession}" .config="${this.config.menu.find(item => item.id === "clinical")}">
                        </category-page>
                    </div>
                ` : null}

                ${this.config.enabledComponents["cat-catalog"] ? html`
                    <div class="content" id="cat-catalog">
                        <category-page .opencgaSession="${this.opencgaSession}" .config="${this.config.menu.find(item => item.id === "catalog")}">
                        </category-page>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["cat-alignment"] ? html`
                    <div class="content" id="cat-alignment">
                        <category-page .opencgaSession="${this.opencgaSession}" .config="${this.config.menu.find(item => item.id === "alignment")}">
                        </category-page>
                    </div>
                ` : null}

                ${this.config.enabledComponents["cat-ga4gh"] ? html`
                    <div class="content" id="cat-ga4gh">
                        <category-page .opencgaSession="${this.opencgaSession}" .config="${this.config.menu.find(item => item.id === "ga4gh")}">
                        </category-page>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["sampleVariantStatsBrowser"] ? html`
                    <div class="content" id="sampleVariantStatsBrowser">
                        <sample-variant-stats-browser .opencgaSession="${this.opencgaSession}" .sampleId="${this.sampleId}"></sample-variant-stats-browser>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["sampleCancerVariantStatsBrowser"] ? html`
                    <div class="content" id="sampleCancerVariantStatsBrowser">
                        <sample-cancer-variant-stats-browser .opencgaSession="${this.opencgaSession}" .sampleId="${this.sampleId}" .active="true"></sample-cancer-variant-stats-browser>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["sample-variant-stats"] ? html`
                    <div class="content" id="opencga-sample-variant-stats-analysis">
                        <opencga-sample-variant-stats-analysis .opencgaSession="${this.opencgaSession}"></opencga-sample-variant-stats-analysis>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["cohort-variant-stats"] ? html`
                    <div class="content" id="opencga-cohort-variant-stats-analysis">
                        <opencga-cohort-variant-stats-analysis .opencgaSession="${this.opencgaSession}"></opencga-cohort-variant-stats-analysis>
                    </div>
                ` : null}

                ${this.config.enabledComponents["eligibility"] ? html`
                    <div class="content" id="opencga-variant-eligibility-analysis">
                        <opencga-variant-eligibility-analysis .opencgaSession="${this.opencgaSession}"></opencga-variant-eligibility-analysis>
                    </div>
                ` : null}
                
                 ${this.config.enabledComponents["sample-eligibility"] ? html`
                    <div class="content" id="opencga-sample-eligibility-analysis">
                        <opencga-sample-eligibility-analysis .opencgaSession="${this.opencgaSession}"></opencga-sample-eligibility-analysis>
                    </div>
                ` : null}
                 
                 ${this.config.enabledComponents["knockout"] ? html`
                    <div class="content" id="opencga-knockout-analysis">
                        ${AnalysisRegistry.get("knockout").form(this.opencgaSession, this.cellbaseClient)}
            
                    </div>
                ` : null}
                 
                 ${this.config.enabledComponents["knockout-result"] ? html`
                    <div class="content" id="opencga-knockout-analysis-result">
                        <opencga-knockout-analysis-result .opencgaSession="${this.opencgaSession}" .cellbaseClient="${this.cellbaseClient}" ></opencga-knockout-analysis-result>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["inferred-sex"] ? html`
                    <div class="content" id="opencga-inferred-sex-analysis">
                        <opencga-inferred-sex-analysis .opencgaSession="${this.opencgaSession}"></opencga-inferred-sex-analysis>
                    </div>
                ` : null}

                ${this.config.enabledComponents["individual-relatedness"] ? html`
                    <div class="content" id="opencga-individual-relatedness-analysis">
                        <opencga-individual-relatedness-analysis .opencgaSession="${this.opencgaSession}"></opencga-individual-relatedness-analysis>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["mendelian-errors"] ? html`
                    <div class="content" id="opencga-individual-mendelian-error-analysis">
                        <opencga-individual-mendelian-error-analysis .opencgaSession="${this.opencgaSession}"></opencga-individual-mendelian-error-analysis>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["sample-qc"] ? html`
                    <div class="content" id="opencga-sample-qc-analysis">
                        <opencga-sample-qc-analysis .opencgaSession="${this.opencgaSession}"></opencga-sample-qc-analysis>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["individual-qc"] ? html`
                    <div class="content" id="opencga-individual-qc-analysis">
                        <opencga-individual-qc-analysis .opencgaSession="${this.opencgaSession}"></opencga-individual-qc-analysis>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["family-qc"] ? html`
                    <div class="content" id="opencga-family-qc-analysis">
                        <opencga-family-qc-analysis .opencgaSession="${this.opencgaSession}"></opencga-family-qc-analysis>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["plink"] ? html`
                    <div class="content" id="opencga-plink-analysis">
                        <opencga-plink-analysis .opencgaSession="${this.opencgaSession}"></opencga-plink-analysis>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["gatk"] ? html`
                    <div class="content" id="opencga-gatk-analysis">
                        <opencga-gatk-analysis .opencgaSession="${this.opencgaSession}"></opencga-gatk-analysis>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["variant-exporter"] ? html`
                    <div class="content" id="opencga-variant-exporter-analysis">
                        <opencga-variant-exporter-analysis .opencgaSession="${this.opencgaSession}"></opencga-variant-exporter-analysis>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["variant-stats-exporter"] ? html`
                    <div class="content" id="opencga-variant-stats-exporter-analysis">
                        <opencga-variant-stats-exporter-analysis .opencgaSession="${this.opencgaSession}"></opencga-variant-stats-exporter-analysis>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["mutational-signature"] ? html`
                    <div class="content" id="opencga-mutational-signature-analysis">
                        <opencga-mutational-signature-analysis .opencgaSession="${this.opencgaSession}"></opencga-mutational-signature-analysis>
                    </div>
                ` : null}

                ${this.config.enabledComponents["gwas"] ? html`
                    <div class="content" id="opencga-gwas-analysis">
                        <opencga-gwas-analysis .opencgaSession="${this.opencgaSession}"></opencga-gwas-analysis>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["rd-tiering"] ? html`
                    <div class="content" id="opencga-rd-tiering-analysis">
                        <opencga-rd-tiering-analysis .opencgaSession="${this.opencgaSession}"></opencga-rd-tiering-analysis>
                    </div>
                ` : null}
    
                ${this.config.enabledComponents["clinical-analysis-writer"] ? html`
                    <tool-header title="${"Create Case"}" icon="${"fas fa-window-restore"}"></tool-header>
                    <div class="content container" id="opencga-clinical-analysis-create">
                        <opencga-clinical-analysis-writer .opencgaSession="${this.opencgaSession}"
                                                          @clinicalanalysischange="${this.onClinicalAnalysisEditor}">
                        </opencga-clinical-analysis-writer>
                    </div>
                ` : null}

                ${this.config.enabledComponents.account ? html`
                    <div class="content" id="account">
                        <iva-profile .opencgaSession="${this.opencgaSession}">
                        </iva-profile>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["file-manager"] ? html`
                    <div class="content" id="file-manager">
                        <opencga-file-manager .opencgaSession="${this.opencgaSession}">
                        </opencga-file-manager>
                    </div>
                ` : null}

                ${this.config.enabledComponents.settings ? html`
                    <div class="content" id="settings">
                        <iva-settings .opencgaSession="${this.opencgaSession}">
                        </iva-settings>
                    </div>
                ` : null}


                ${this.config.enabledComponents["interpreter"] ? html`
                    <div class="content" id="interpreter">
                        <variant-interpreter    .opencgaSession="${this.opencgaSession}" 
                                                .cellbaseClient="${this.cellbaseClient}"
                                                .clinicalAnalysisId="${this.clinicalAnalysisId}"
                                                .config="${VariantInterpreterConfig}"
                                                @selectClinicalAnalysis="${this.onSelectClinicalAnalysis}">
                        </variant-interpreter>
                    </div>
                ` : null}

                <!-- Alignment Analysis-->
                ${this.config.enabledComponents["alignment-index"] ? html`
                    <div id="alignment-index" class="content">
                        <opencga-alignment-index-analysis .opencgaSession="${this.opencgaSession}"></opencga-alignment-index-analysis>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["coverage-index"] ? html`
                    <div id="coverage-index" class="content">
                        <opencga-coverage-index-analysis .opencgaSession="${this.opencgaSession}"></opencga-coverage-index-analysis>
                    </div>
                ` : null}

                ${this.config.enabledComponents["alignment-stats"] ? html`
                    <div id="alignment-stats" class="content col-md-6 col-md-offset-3">
                        <opencga-alignment-stats-analysis .opencgaSession="${this.opencgaSession}"></opencga-alignment-stats-analysis>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents["job-view"] ? html`
                    <tool-header title="${this.jobSelected || "No job selected"}" icon="${"fas fa-rocket"}"></tool-header>
                    <div id="job-view" class="content col-md-8 col-md-offset-2">
                        <opencga-job-view .jobId="${this.jobSelected}" mode="full" .opencgaSession="${this.opencgaSession}"></opencga-job-view>
                    </div>
                ` : null}

                <div id="notifications-queue" class="col-xs-11 col-sm-4"></div>

            </div>
            <notification-element .queue="${new NotificationQueue().get()}"></notification-element>
`;

    }

}

customElements.define("iva-app", IvaApp);
