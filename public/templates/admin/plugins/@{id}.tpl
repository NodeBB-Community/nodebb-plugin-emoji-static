<ul class="nav nav-pills">
    <li class="active"><a href="#sets" data-toggle="tab" aria-expanded="false">[[@{iD}:tabs.sets]]</a></li>
    <li><a href="#help" data-toggle="tab" aria-expanded="true">
        <i class="fa fa-fw fa-question-circle"></i> [[@{iD}:tabs.help]]
    </a></li>
</ul>

<div class="tab-content">
    <div class="tab-pane fade active in" id="sets">
        <form class="form-horizontal" id="@{id}-settings">
            <div class="panel panel-default">
                <h2 class="panel-heading">[[@{iD}:name]]
                    <small>[[@{iD}:version]]</small>
                    / [[@{iD}:settings]]
                </h2>

                <div class="panel-body">
                    <ol class="list-group">
                        <li class="list-group-item panel-set" data-set-index="0"> <!-- TODO iterate over sets -->

                            <div class="form-group">
                                <label for="@{id}-set-0-id" class="col-xs-12 col-sm-5 col-md-4 control-label">
                                    [[@{iD}:settings.set.id]]
                                </label>
                                <div class="col-xs-12 col-sm-7 col-md-8">
                                    <input id="@{id}-set-0-id" class="form-control" type="text" data-key="sets.0.id"/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="@{id}-set-0-name" class="col-xs-12 col-sm-5 col-md-4 control-label">
                                    [[@{iD}:settings.set.name]]
                                </label>
                                <div class="col-xs-12 col-sm-7 col-md-8">
                                    <input id="@{id}-set-0-name" class="form-control" type="text"
                                           data-key="sets.0.name"/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="@{id}-set-0-description" class="col-xs-12 col-sm-5 col-md-4 control-label">
                                    [[@{iD}:settings.set.description]]
                                </label>
                                <div class="col-xs-12 col-sm-7 col-md-8">
                                    <textarea id="@{id}-set-0-description" class="form-control"
                                              data-key="sets.0.description"></textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="@{id}-set-0-index" class="col-xs-12 col-sm-5 col-md-4 control-label">
                                    [[@{iD}:settings.set.index]]
                                </label>
                                <div class="col-xs-12 col-sm-7 col-md-8">
                                    <input id="@{id}-set-0-index" class="form-control" type="text"
                                           data-key="sets.0.index"/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="@{id}-set-0-attribution" class="col-xs-12 col-sm-5 col-md-4 control-label">
                                    [[@{iD}:settings.set.attribution]]
                                </label>
                                <div class="col-xs-12 col-sm-7 col-md-8">
                                    <input type="hidden" id="@{id}-set-0-attribution-holder" data-empty="false"
                                           data-key="sets.0.attribution"/>
                                    <div class="editor-wrapper">
                                        <div id="@{id}-set-0-attribution" class="set-editor" data-mode="html"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="@{id}-set-0-license" class="col-xs-12 col-sm-5 col-md-4 control-label">
                                    [[@{iD}:settings.set.license]]
                                </label>
                                <div class="col-xs-12 col-sm-7 col-md-8">
                                    <input type="hidden" id="@{id}-set-0-license-holder" data-empty="false"
                                           data-key="sets.0.license"/>
                                    <div class="editor-wrapper">
                                        <div id="@{id}-set-0-license" class="set-editor" data-mode="text"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="@{id}-set-0-styles-main" class="col-xs-12 col-sm-5 col-md-4 control-label">
                                    [[@{iD}:settings.set.styles.main]]
                                </label>
                                <div class="col-xs-12 col-sm-7 col-md-8">
                                    <input type="hidden" id="@{id}-set-0-styles-main-holder" data-empty="false"
                                           data-key="sets.0.styles.main"/>
                                    <div class="editor-wrapper">
                                        <div id="@{id}-set-0-styles-main" class="set-editor" data-mode="css"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="@{id}-set-0-styles-email" class="col-xs-12 col-sm-5 col-md-4 control-label">
                                    [[@{iD}:settings.set.styles.email]]
                                </label>
                                <div class="col-xs-12 col-sm-7 col-md-8">
                                    <input type="hidden" id="@{id}-set-0-styles-email-holder" data-empty="false"
                                           data-key="sets.0.styles.email"/>
                                    <div class="editor-wrapper">
                                        <div id="@{id}-set-0-styles-email" class="set-editor" data-mode="css"></div>
                                    </div>
                                </div>
                            </div>

                        </li>
                    </ol>
                </div>

                <div class="panel-footer">
                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <button type="submit" class="btn btn-primary btn-block" id="@{id}-settings-save"
                                    accesskey="s">
                                <i class="fa fa-fw fa-save"></i> [[plugins:actions.save]]
                            </button>
                        </div>
                        <div class="col-xs-12 col-md-6">
                            <button type="button" class="btn btn-warning btn-block" id="@{id}-settings-reset">
                                <i class="fa fa-fw fa-eraser"></i> [[plugins:actions.reset]]
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div class="tab-pane fade" id="help">
        <h2>Custom emoji sets</h2>
        <p>
            <!-- TODO remove when outdated -->
            <b>At the moment it is only possible to define one custom set.</b>
        </p>
        <p>
            This plugin allows you to define custom sets of images to be used as emoji.<br/>
            The sets need to be activated within the admin settings of Emoji Extended after creation.
        </p>
        <h3>Set definition</h3>
        <p>
            Each set requires at least an ID and the file path of an index file.
        </p>
        <h4>Meta data</h4>
        <p>
            The <code>ID</code> is used within each matched image as <code>data-set-id</code> HTML attribute.<br/>
            <code>name</code> and <code>description</code> are used to ease the recognition within the admin settings of
            Emoji Extended.
        </p>
        <h4>Legal information</h4>
        <p>
            The optional fields <code>attribution</code> and <code>license</code> are shown to each user within the
            emoji modal of the composer. They are to be found within the "legal information" tab.
        </p>
        <h4>Custom CSS</h4>
        <p>
            The styles fields allow you to bind specific styles to a set. It is recommended to use the class
            <code>emoji</code> in combination with the attribute <code>data-set-id</code> to restrict the styles to a
            specific set.
            <!-- TODO remove the following when bug is closed -->
            Don't worry about the unqualified selector warning, this is a
            <a href="https://github.com/CSSLint/csslint/issues/318" target="_blank">bug</a> of the CSS linter.
        </p>
        <pre>.emoji[data-set-id="my-custom-set"] { width: auto; height: auto; }</pre>
        <p>
            The following case-specific classes are assigned to emoji and may be used for styles:
        </p>
        <ul>
            <li><code>emoji-parsed</code> - Those who got parsed server-side and thus within posts, etc.</li>
            <li><code>emoji-completion</code> - Those within the auto completion list.</li>
            <li><code>emoji-presentation</code> - Those within the emoji modal of the composer.</li>
        </ul>
        <h4>Index file</h4>
        <p>
            The index file of a set must be valid JSON; No attributes required, defaults as following:
        </p>
        <pre>{ "cwd": "./", "files": "**/*", "ignore": null, "images": {} }</pre>
        <p>
            The <code>files</code> (relative to <code>cwd</code>) and <code>ignore</code> attributes are passed to
            <a href="https://www.npmjs.com/package/glob" target="_blank">glob</a>. Alongside the <code>ignore</code>
            option <code>nodir: true</code> and <code>cwd: indexFileBasePath</code> are being passed.
        </p>
        <p>
            The <code>images</code> attribute may specify for each image ID (the filename without extension) the
            following properties:
        </p>
        <pre>{ "id": String, "category": String, "width": Number, "height": Number }</pre>
        <p>
            Default values:
        </p>
        <ul>
            <li>
                <code>id</code> - The filename without extension.
            </li>
            <li>
                <code>category</code> - If nested directory structure, the names of parent directories (up to
                <code>cwd</code>) with <code>.</code> as separator. Otherwise <code>"others"</code>.
            </li>
            <li>
                <code>width</code> - The original image width; As
                <a href="https://www.npmjs.com/package/image-size" target="_blank">image-size</a> returns.
            </li>
            <li>
                <code>height</code> - The original image height; As
                <a href="https://www.npmjs.com/package/image-size" target="_blank">image-size</a> returns.
            </li>
        </ul>
    </div>
</div>

<link rel="stylesheet" type="text/css" href="{relative_path}/plugins/@{name}/static/styles/admin/settings.css"/>

<script type="text/javascript" src="{relative_path}/plugins/@{name}/static/scripts/admin/settings.js"></script>
