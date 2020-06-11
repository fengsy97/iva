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
import Utils from "../lib/jsorolla/src/core/utils.js";
import "../lib/jsorolla/src/core/webcomponents/tool-header.js";

// TODO the property "disabled" in config have to be renamed in active (boolean for an user or an usergroup)

export default class CategoryPage extends LitElement {

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
            config: {
                type: Object
            }
        };
    }

    _init() {
        this._prefix = "sf-" + Utils.randomString(6) + "_";
        this._config = {...this.getDefaultConfig(), ...this.config};

    }

    updated(changedProperties) {
        if (changedProperties.has("property")) {
            this.propertyObserver();
        }
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

    getDefaultConfig() {

    }

    render() {
        return html`
        <style>
            #category-page {
                padding: 10px;
            }
            #category-page > a.item{
                padding: 10px;
                display: inline-block;
                color: #fff;
                background-color: #42424E;
                width: 400px;
                min-height: 120px;
                position: relative;
                margin: 10px;
            }
            
            #category-page > a.item:hover{
                text-decoration: none;
            }

        
            #category-page .icon {
                width: 100px;
                vertical-align: bottom;
            }
            
            #category-page .content {
                float: left;
                width: 255px;
            }
            
            #category-page .description {
                color: #b6c1c9;
            }
            
            #category-page .section-title {
                font-size: 1.6em;
                font-weight: 500;
                letter-spacing: 5px;
                margin-top: 1em;
                color: #000966;
                font-family: "Roboto",serif;
            }
            
            #category-page .lock-overlay {            
                position: absolute;
                background-image: linear-gradient(45deg, #4d4d4d80 25%, #47474780 25%, #47474780 50%, #4d4d4d80 50%, #4d4d4d80 75%, #47474780 75%, #47474780 100%);
                background-size: 40px 40px;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: -10px;
            }
        </style>

        <tool-header title="${this._config.title}" icon="${this._config.icon}"></tool-header>

            
        <div id="category-page">
            ${this.config.submenu && this.config.submenu.length ? this.config.submenu.map( (item, i) => item.category ? html`
                <div class="section-title">${item.title}</div>
                ` : item.separator ? null : html`
                    
                    <a class="item ${item.disabled ? "disabled" : ""}" href="${ !item.disabled ? `#${item.id}` : "javascript: void 0"}">
                    ${item.disabled ? html`
                        <div class="lock-overlay">
                            <i class="fas fa-4x fa-lock"></i>
                        </div>
                    ` : null}
                        
                            <div class="text-icon-wrapper">
                                <div class="text-icon ${i % 2 === 0 ? "green": i % 3 === 0 ? "red": ""}">
                                    ${item.acronym ? item.acronym : item.title[0] + item.title[1] + item.title[2].toLowerCase()}
                                    <!--<img src="img/tools/icons/${item.icon || "variant_browser.svg"}" /> -->
                                </div>
                            </div>
                            <div class="content">
                                <div class="title uppercase">${item.title}</div>
                                <div class="description">${this.renderHTML(item.description || "Lorem ipsom sic dolor")}</div>
                            </div>
                    </a>
                    ` ) : null}
        </div>
        `;
    }

}

customElements.define("category-page", CategoryPage);
