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

import {LitElement, html} from "/web_modules/lit-element.js";
import UtilsNew from "../lib/jsorolla/src/core/utilsNew.js";

// TODO Video-Tutorial here?

export default class GettingStarted extends LitElement {

    constructor() {
        super();
        this._init();
    }

    createRenderRoot() {
        return this;
    }

    static get properties() {
        return {
            version: {
                type: String
            },
            opencgaSession: {
                type: Object
            },
            config: {
                type: Object
            }
        };
    }

    _init() {
        this._prefix = "gs-" + UtilsNew.randomString(6) + "_";
    }

    openModal(e) {
        $("#thumbnail_modal img", this).attr("src", e.target.src);
        $("#thumbnail_modal", this).modal("show");
    }

    isVisible(item) {
        switch (item.visibility) {
        case "public":
            return true;
        case "private":
            return UtilsNew.isNotUndefinedOrNull(this.opencgaSession) && UtilsNew.isNotEmpty(this.opencgaSession.token);
        case "none":
        default:
            return false;
        }
    }

    renderHTML(html) {
        return document.createRange().createContextualFragment(`${html}`);
    }

    render() {
        return html`
        <style>
            .getting-started .position-relative {
                position: relative;
            }
            
            .getting-started section {
                padding: 50px 0;
                border-bottom: 1px solid #d4d4d4;
            }
            
            .getting-started section:last-child {
                border:0
            }
            
            .getting-started section img {
                cursor: pointer;
                -webkit-transition: all 0.2s;
                -moz-transition: all 0.2s;
                transition: all 0.2s;
                -webkit-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
                -moz-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
                box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
                position: relative;
            }
            
            .getting-started section img:hover {
                -webkit-box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.75);
                -moz-box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.75);
                box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.75);
            }
            
            .getting-started .modal .modal-dialog {
                width: 80%;
            }
            
            .getting-started ul {
                display: inline-block;
            }
            
        </style>
        <div class="getting-started">
            <div class="container">
                <div class="row">
                    <div class="col-md-12"><h1>Getting started with IVA</h1>
                        <hr>
                    </div>
                </div>
                ${this.config.components.filter(this.isVisible).map( (tool, i) => html`
                    <section>
                        <div class="row">
                            <div class="col-sm-6 col-md-5 ${ i % 2 ? "col-md-push-7" : "" } position-relative">
                                <img class="img-responsive" src="img/tools/thumbnails/${tool.thumbnail}" @click="${this.openModal}">
                            </div>
                            <div class="col-xs-6 col-md-7 ${ i % 2 ? "col-md-pull-5 text-right" : "" }">
                                <h2><a href="#${tool.id}/${this.opencgaSession && this.opencgaSession.project? `${this.opencgaSession.project.id}/${this.opencgaSession.study.id}` : ""}"> ${tool.title} </a></h2>
                                <div>${this.renderHTML(tool.description)}</div>
                            </div>
                        </div>
                    </section>
                `)}
            </div>
        </div>

        <div class="modal fade" id="thumbnail_modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <img class="img-responsive" src="">
                    </div>
                </div>
            </div>
        </div>
        `;
    }

}

customElements.define("getting-started", GettingStarted);
