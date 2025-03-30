use tauri_plugin_sql::{Migration, MigrationKind};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "Create initial tables for clipCode db",
            sql: r#"
            CREATE TABLE IF NOT EXISTS languages (
                language_id TEXT PRIMARY KEY,
                name TEXT UNIQUE
            );

            CREATE TABLE IF NOT EXISTS categories(
                category_id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE
            );

            CREATE TABLE IF NOT EXISTS languages_categories (
                fk_language_id TEXT NOT NULL,
                fk_category_id INTEGER NOT NULL,
                PRIMARY KEY (fk_language_id, fk_category_id),
                FOREIGN KEY (fk_language_id) REFERENCES languages(language_id),
                FOREIGN KEY (fk_category_id) REFERENCES  categories(category_id)
            );

            CREATE TABLE IF NOT EXISTS snippets (
                snippet_id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                code TEXT NOT NULL,
                description TEXT NOT NULL,
                is_favorite BOOLEAN DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                fk_language_id TEXT NOT NULL,
                FOREIGN KEY (fk_language_id) REFERENCES languages(language_id) ON DELETE CASCADE
            );
            "#,
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "Seed supported programming languages into the languages table",
            sql: r#"
            INSERT INTO languages
            VALUES
            ('abap', 'ABAP'),
            ('actionscript-3', 'ActionScript'),
            ('ada', 'Ada'),
            ('angular-html', 'Angular HTML'),
            ('angular-ts', 'Angular TypeScript'),
            ('apache', 'Apache Conf'),
            ('apex', 'Apex'),
            ('apl', 'APL'),
            ('applescript', 'AppleScript'),
            ('ara', 'Ara'),
            ('asciidoc', 'AsciiDoc'),
            ('asm', 'Assembly'),
            ('astro', 'Astro'),
            ('awk', 'AWK'),
            ('ballerina', 'Ballerina'),
            ('bat', 'Batch File'),
            ('beancount', 'Beancount'),
            ('berry', 'Berry'),
            ('bibtex', 'BibTeX'),
            ('bicep', 'Bicep'),
            ('blade', 'Blade'),
            ('bsl', '1C (Enterprise)'),
            ('c', 'C'),
            ('cadence', 'Cadence'),
            ('cairo', 'Cairo'),
            ('clarity', 'Clarity'),
            ('clojure', 'Clojure'),
            ('cmake', 'CMake'),
            ('cobol', 'COBOL'),
            ('codeowners', 'CODEOWNERS'),
            ('codeql', 'CodeQL'),
            ('coffee', 'CoffeeScript'),
            ('common-lisp', 'Common Lisp'),
            ('coq', 'Coq'),
            ('cpp', 'C++'),
            ('crystal', 'Crystal'),
            ('csharp', 'C#'),
            ('css', 'CSS'),
            ('csv', 'CSV'),
            ('cue', 'CUE'),
            ('cypher', 'Cypher'),
            ('d', 'D'),
            ('dart', 'Dart'),
            ('dax', 'DAX'),
            ('desktop', 'Desktop'),
            ('diff', 'Diff'),
            ('docker', 'Dockerfile'),
            ('dotenv', 'dotEnv'),
            ('dream-maker', 'Dream Maker'),
            ('edge', 'Edge'),
            ('elixir', 'Elixir'),
            ('elm', 'Elm'),
            ('emacs-lisp', 'Emacs Lisp'),
            ('erb', 'ERB'),
            ('erlang', 'Erlang'),
            ('fennel', 'Fennel'),
            ('fish', 'Fish'),
            ('fluent', 'Fluent'),
            ('fortran-fixed-form', 'Fortran (Fixed Form)'),
            ('fortran-free-form', 'Fortran (Free Form)'),
            ('fsharp', 'F#'),
            ('gdresource', 'GDResource'),
            ('gdscript', 'GDScript'),
            ('gdshader', 'GDShader'),
            ('genie', 'Genie'),
            ('gherkin', 'Gherkin'),
            ('git-commit', 'Git Commit Message'),
            ('git-rebase', 'Git Rebase Message'),
            ('gleam', 'Gleam'),
            ('glimmer-js', 'Glimmer JS'),
            ('glimmer-ts', 'Glimmer TS'),
            ('glsl', 'GLSL'),
            ('gnuplot', 'Gnuplot'),
            ('go', 'Go'),
            ('graphql', 'GraphQL'),
            ('groovy', 'Groovy'),
            ('hack', 'Hack'),
            ('haml', 'Ruby Haml'),
            ('handlebars', 'Handlebars'),
            ('haskell', 'Haskell'),
            ('haxe', 'Haxe'),
            ('hcl', 'HashiCorp HCL'),
            ('hjson', 'Hjson'),
            ('hlsl', 'HLSL'),
            ('html', 'HTML'),
            ('html-derivative', 'HTML (Derivative)'),
            ('http', 'HTTP'),
            ('hxml', 'HXML'),
            ('hy', 'Hy'),
            ('imba', 'Imba'),
            ('ini', 'INI'),
            ('java', 'Java'),
            ('javascript', 'JavaScript'),
            ('jinja', 'Jinja'),
            ('jison', 'Jison'),
            ('json', 'JSON'),
            ('json5', 'JSON5'),
            ('jsonc', 'JSON with Comments'),
            ('jsonl', 'JSON Lines'),
            ('jsonnet', 'Jsonnet'),
            ('jssm', 'JSSM'),
            ('jsx', 'JSX'),
            ('julia', 'Julia'),
            ('kotlin', 'Kotlin'),
            ('kusto', 'Kusto'),
            ('latex', 'LaTeX'),
            ('lean', 'Lean 4'),
            ('less', 'Less'),
            ('liquid', 'Liquid'),
            ('llvm', 'LLVM IR'),
            ('log', 'Log file'),
            ('logo', 'Logo'),
            ('lua', 'Lua'),
            ('luau', 'Luau'),
            ('make', 'Makefile'),
            ('markdown', 'Markdown'),
            ('marko', 'Marko'),
            ('matlab', 'MATLAB'),
            ('mdc', 'MDC'),
            ('mdx', 'MDX'),
            ('mermaid', 'Mermaid'),
            ('mipsasm', 'MIPS Assembly'),
            ('mojo', 'Mojo'),
            ('move', 'Move'),
            ('narrat', 'Narrat Language'),
            ('nextflow', 'Nextflow'),
            ('nginx', 'Nginx'),
            ('nim', 'Nim'),
            ('nix', 'Nix'),
            ('nushell', 'nushell'),
            ('objective-c', 'Objective-C'),
            ('objective-cpp', 'Objective-C++'),
            ('ocaml', 'OCaml'),
            ('pascal', 'Pascal'),
            ('perl', 'Perl'),
            ('php', 'PHP'),
            ('plsql', 'PL/SQL'),
            ('po', 'Gettext PO'),
            ('polar', 'Polar'),
            ('postcss', 'PostCSS'),
            ('powerquery', 'PowerQuery'),
            ('powershell', 'PowerShell'),
            ('prisma', 'Prisma'),
            ('prolog', 'Prolog'),
            ('proto', 'Protocol Buffer 3'),
            ('pug', 'Pug'),
            ('puppet', 'Puppet'),
            ('purescript', 'PureScript'),
            ('python', 'Python'),
            ('qml', 'QML'),
            ('qmldir', 'QML Directory'),
            ('qss', 'Qt Style Sheets'),
            ('r', 'R'),
            ('racket', 'Racket'),
            ('raku', 'Raku'),
            ('razor', 'ASP.NET Razor'),
            ('reg', 'Windows Registry Script'),
            ('regexp', 'RegExp'),
            ('rel', 'Rel'),
            ('riscv', 'RISC-V'),
            ('rst', 'reStructuredText'),
            ('ruby', 'Ruby'),
            ('rust', 'Rust'),
            ('sas', 'SAS'),
            ('sass', 'Sass'),
            ('scala', 'Scala'),
            ('scheme', 'Scheme'),
            ('scss', 'SCSS'),
            ('sdbl', '1C (Query)'),
            ('shaderlab', 'ShaderLab'),
            ('shellscript', 'Shell'),
            ('shellsession', 'Shell Session'),
            ('smalltalk', 'Smalltalk'),
            ('solidity', 'Solidity'),
            ('soy', 'Closure Templates'),
            ('sparql', 'SPARQL'),
            ('splunk', 'Splunk Query Language'),
            ('sql', 'SQL'),
            ('ssh-config', 'SSH Config'),
            ('stata', 'Stata'),
            ('stylus', 'Stylus'),
            ('svelte', 'Svelte'),
            ('swift', 'Swift'),
            ('system-verilog', 'SystemVerilog'),
            ('systemd', 'Systemd Units'),
            ('talonscript', 'TalonScript'),
            ('tasl', 'Tasl'),
            ('tcl', 'Tcl'),
            ('templ', 'Templ'),
            ('terraform', 'Terraform'),
            ('tex', 'TeX'),
            ('toml', 'TOML'),
            ('ts-tags', 'TypeScript with Tags'),
            ('tsv', 'TSV'),
            ('tsx', 'TSX'),
            ('turtle', 'Turtle'),
            ('twig', 'Twig'),
            ('typescript', 'TypeScript'),
            ('typespec', 'TypeSpec'),
            ('typst', 'Typst'),
            ('v', 'V'),
            ('vala', 'Vala'),
            ('vb', 'Visual Basic'),
            ('verilog', 'Verilog'),
            ('vhdl', 'VHDL'),
            ('viml', 'Vim Script'),
            ('vue', 'Vue'),
            ('vue-html', 'Vue HTML'),
            ('vyper', 'Vyper'),
            ('wasm', 'WebAssembly'),
            ('wenyan', 'Wenyan'),
            ('wgsl', 'WGSL'),
            ('wikitext', 'Wikitext'),
            ('wit', 'WebAssembly Interface Types'),
            ('wolfram', 'Wolfram'),
            ('xml', 'XML'),
            ('xsl', 'XSL'),
            ('yaml', 'YAML'),
            ('zenscript', 'ZenScript'),
            ('zig', 'Zig');
            "#,
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "Insert default categories",
            sql: r#"
                INSERT OR IGNORE INTO categories (name) VALUES ('General');
                INSERT OR IGNORE INTO categories (name) VALUES ('Web Frontend');
                INSERT OR IGNORE INTO categories (name) VALUES ('Web Backend');
                INSERT OR IGNORE INTO categories (name) VALUES ('Mobile Dev');
                INSERT OR IGNORE INTO categories (name) VALUES ('Data Science');
                INSERT OR IGNORE INTO categories (name) VALUES ('Game Dev');
                INSERT OR IGNORE INTO categories (name) VALUES ('Shell Scripting');
                INSERT OR IGNORE INTO categories (name) VALUES ('Systems/Embedded');
                INSERT OR IGNORE INTO categories (name) VALUES ('Functional');
                INSERT OR IGNORE INTO categories (name) VALUES ('Logic/Rules');
                INSERT OR IGNORE INTO categories (name) VALUES ('Metaprogramming');
                INSERT OR IGNORE INTO categories (name) VALUES ('Markup/Data');
                INSERT OR IGNORE INTO categories (name) VALUES ('Data Query');
                INSERT OR IGNORE INTO categories (name) VALUES ('DSL');
            "#,
            kind: MigrationKind::Up
        },
        Migration {
            version: 4,
            description: "Insert categories with languages",
            sql: r#"
                -- General
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('abap', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('ada', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('apl', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('awk', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('ballerina', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('berry', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('c', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('cpp', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('csharp', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('d', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('dart', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('elixir', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('erlang', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('fsharp', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('go', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('groovy', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('haskell', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('hy', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('imba', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('java', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('javascript', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('julia', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('kotlin', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('lua', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('luau', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('mojo', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('nim', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('objective-c', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('objective-cpp', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('ocaml', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('perl', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('php', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('powershell', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('python', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('r', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('racket', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('raku', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('ruby', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('rust', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('scala', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('smalltalk', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('swift', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('tcl', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('vala', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('vb', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('v', (SELECT category_id FROM categories WHERE name = 'General'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('zig', (SELECT category_id FROM categories WHERE name = 'General'));

                -- Web Frontend
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('angular-html', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('angular-ts', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('css', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('dart', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('edge', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('elm', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('glimmer-js', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('glimmer-ts', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('html', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('javascript', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('jsx', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('less', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('mdx', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('postcss', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('pug', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('qml', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('qss', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('sass', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('scss', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('svelte', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('stylus', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('templ', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('tsx', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('typescript', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('vue', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('vue-html', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('wasm', (SELECT category_id FROM categories WHERE name = 'Web Frontend'));

                -- Web Backend
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('abap', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('apex', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('ballerina', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('c', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('cpp', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('csharp', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('d', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('elixir', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('erlang', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('go', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('groovy', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('hack', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('java', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('javascript', (SELECT category_id FROM categories WHERE name = 'Web Backend')); -- Node.js
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('kotlin', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('lua', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('nim', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('objective-c', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('objective-cpp', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('perl', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('php', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('plsql', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('python', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('r', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('ruby', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('rust', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('scala', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('swift', (SELECT category_id FROM categories WHERE name = 'Web Backend'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('vala', (SELECT category_id FROM categories WHERE name = 'Web Backend'));

                -- Mobile Dev
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('dart', (SELECT category_id FROM categories WHERE name = 'Mobile Dev')); -- Flutter
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('java', (SELECT category_id FROM categories WHERE name = 'Mobile Dev')); -- Android
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('kotlin', (SELECT category_id FROM categories WHERE name = 'Mobile Dev')); -- Android
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('objective-c', (SELECT category_id FROM categories WHERE name = 'Mobile Dev')); -- iOS
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('objective-cpp', (SELECT category_id FROM categories WHERE name = 'Mobile Dev')); -- iOS
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('qml', (SELECT category_id FROM categories WHERE name = 'Mobile Dev')); -- Qt
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('swift', (SELECT category_id FROM categories WHERE name = 'Mobile Dev')); -- iOS
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('javascript', (SELECT category_id FROM categories WHERE name = 'Mobile Dev')); -- React Native, Ionic, etc.
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('typescript', (SELECT category_id FROM categories WHERE name = 'Mobile Dev')); -- React Native, Ionic, etc.
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('csharp', (SELECT category_id FROM categories WHERE name = 'Mobile Dev')); -- Xamarin

                -- Data Science
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('dax', (SELECT category_id FROM categories WHERE name = 'Data Science'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('julia', (SELECT category_id FROM categories WHERE name = 'Data Science'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('matlab', (SELECT category_id FROM categories WHERE name = 'Data Science'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('powerquery', (SELECT category_id FROM categories WHERE name = 'Data Science'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('python', (SELECT category_id FROM categories WHERE name = 'Data Science'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('r', (SELECT category_id FROM categories WHERE name = 'Data Science'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('sas', (SELECT category_id FROM categories WHERE name = 'Data Science'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('stata', (SELECT category_id FROM categories WHERE name = 'Data Science'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('scala', (SELECT category_id FROM categories WHERE name = 'Data Science')); -- Spark

                -- Game Dev
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('c', (SELECT category_id FROM categories WHERE name = 'Game Dev'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('cpp', (SELECT category_id FROM categories WHERE name = 'Game Dev'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('csharp', (SELECT category_id FROM categories WHERE name = 'Game Dev')); -- Unity
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('gdscript', (SELECT category_id FROM categories WHERE name = 'Game Dev'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('gdshader', (SELECT category_id FROM categories WHERE name = 'Game Dev'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('glsl', (SELECT category_id FROM categories WHERE name = 'Game Dev'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('hlsl', (SELECT category_id FROM categories WHERE name = 'Game Dev'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('lua', (SELECT category_id FROM categories WHERE name = 'Game Dev'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('shaderlab', (SELECT category_id FROM categories WHERE name = 'Game Dev'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('javascript', (SELECT category_id FROM categories WHERE name = 'Game Dev')); -- HTML5 Games
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('python', (SELECT category_id FROM categories WHERE name = 'Game Dev')); -- Pygame

                -- Shell Scripting
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('awk', (SELECT category_id FROM categories WHERE name = 'Shell Scripting'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('fish', (SELECT category_id FROM categories WHERE name = 'Shell Scripting'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('nushell', (SELECT category_id FROM categories WHERE name = 'Shell Scripting'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('powershell', (SELECT category_id FROM categories WHERE name = 'Shell Scripting'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('shellscript', (SELECT category_id FROM categories WHERE name = 'Shell Scripting')); -- Bash, Zsh, etc.
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('shellsession', (SELECT category_id FROM categories WHERE name = 'Shell Scripting'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('talonscript', (SELECT category_id FROM categories WHERE name = 'Shell Scripting'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('bat', (SELECT category_id FROM categories WHERE name = 'Shell Scripting'));

                -- Systems/Embedded
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('asm', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('mipsasm', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('riscv', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('c', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('cpp', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('nim', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('rust', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('system-verilog', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('tcl', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('v', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('vhdl', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('ada', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('zig', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('verilog', (SELECT category_id FROM categories WHERE name = 'Systems/Embedded'));

                -- Functional
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('clojure', (SELECT category_id FROM categories WHERE name = 'Functional'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('elm', (SELECT category_id FROM categories WHERE name = 'Functional'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('erlang', (SELECT category_id FROM categories WHERE name = 'Functional'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('fsharp', (SELECT category_id FROM categories WHERE name = 'Functional'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('haskell', (SELECT category_id FROM categories WHERE name = 'Functional'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('purescript', (SELECT category_id FROM categories WHERE name = 'Functional'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('racket', (SELECT category_id FROM categories WHERE name = 'Functional'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('scala', (SELECT category_id FROM categories WHERE name = 'Functional'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('scheme', (SELECT category_id FROM categories WHERE name = 'Functional'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('common-lisp', (SELECT category_id FROM categories WHERE name = 'Functional'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('ocaml', (SELECT category_id FROM categories WHERE name = 'Functional'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('gleam', (SELECT category_id FROM categories WHERE name = 'Functional'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('fennel', (SELECT category_id FROM categories WHERE name = 'Functional'));

                -- Logic/Rules
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('clarity', (SELECT category_id FROM categories WHERE name = 'Logic/Rules'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('codeql', (SELECT category_id FROM categories WHERE name = 'Logic/Rules'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('prolog', (SELECT category_id FROM categories WHERE name = 'Logic/Rules'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('polar', (SELECT category_id FROM categories WHERE name = 'Logic/Rules'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('rel', (SELECT category_id FROM categories WHERE name = 'Logic/Rules'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('sparql', (SELECT category_id FROM categories WHERE name = 'Logic/Rules'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('coq', (SELECT category_id FROM categories WHERE name = 'Logic/Rules'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('lean', (SELECT category_id FROM categories WHERE name = 'Logic/Rules'));

                -- Metaprogramming
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('codeql', (SELECT category_id FROM categories WHERE name = 'Metaprogramming'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('emacs-lisp', (SELECT category_id FROM categories WHERE name = 'Metaprogramming'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('hy', (SELECT category_id FROM categories WHERE name = 'Metaprogramming'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('jison', (SELECT category_id FROM categories WHERE name = 'Metaprogramming'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('logo', (SELECT category_id FROM categories WHERE name = 'Metaprogramming'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('templ', (SELECT category_id FROM categories WHERE name = 'Metaprogramming'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('viml', (SELECT category_id FROM categories WHERE name = 'Metaprogramming'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('wenyan', (SELECT category_id FROM categories WHERE name = 'Metaprogramming'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('tcl', (SELECT category_id FROM categories WHERE name = 'Metaprogramming'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('common-lisp', (SELECT category_id FROM categories WHERE name = 'Metaprogramming'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('scheme', (SELECT category_id FROM categories WHERE name = 'Metaprogramming'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('racket', (SELECT category_id FROM categories WHERE name = 'Metaprogramming'));

                -- Markup/Data
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('asciidoc', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('bibtex', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('csv', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('html', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('hjson', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('ini', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('json', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('json5', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('jsonc', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('jsonl', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('jsonnet', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('markdown', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('rst', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('toml', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('tsv', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('turtle', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('wikitext', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('xml', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('yaml', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('tex', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('latex', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('mdx', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('typst', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('log', (SELECT category_id FROM categories WHERE name = 'Markup/Data'));

                -- Data Query
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('cypher', (SELECT category_id FROM categories WHERE name = 'Data Query'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('dax', (SELECT category_id FROM categories WHERE name = 'Data Query'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('kusto', (SELECT category_id FROM categories WHERE name = 'Data Query'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('plsql', (SELECT category_id FROM categories WHERE name = 'Data Query'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('powerquery', (SELECT category_id FROM categories WHERE name = 'Data Query'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('sdbl', (SELECT category_id FROM categories WHERE name = 'Data Query'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('sparql', (SELECT category_id FROM categories WHERE name = 'Data Query'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('sql', (SELECT category_id FROM categories WHERE name = 'Data Query'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('splunk', (SELECT category_id FROM categories WHERE name = 'Data Query'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('graphql', (SELECT category_id FROM categories WHERE name = 'Data Query'));

                -- DSL
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('actionscript-3', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('applescript', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('ara', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('astro', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('beancount', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('bicep', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('blade', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('bsl', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('cadence', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('cairo', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('cmake', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('cobol', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('codeowners', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('coffee', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('cue', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('desktop', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('diff', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('docker', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('dotenv', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('dream-maker', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('erb', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('fluent', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('fortran-fixed-form', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('fortran-free-form', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('gdresource', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('genie', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('gherkin', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('git-commit', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('git-rebase', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('gnuplot', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('haml', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('handlebars', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('haxe', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('hcl', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('http', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('hxml', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('jinja', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('jssm', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('liquid', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('llvm', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('make', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('marko', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('mdc', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('mermaid', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('move', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('narrat', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('nextflow', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('nginx', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('nix', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('pascal', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('po', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('prisma', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('proto', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('puppet', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('qmldir', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('razor', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('reg', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('regexp', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('solidity', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('soy', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('ssh-config', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('systemd', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('tasl', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('terraform', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('ts-tags', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('twig', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('typespec', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('vyper', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('wgsl', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('wit', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('wolfram', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('xsl', (SELECT category_id FROM categories WHERE name = 'DSL'));
                INSERT OR IGNORE INTO languages_categories (fk_language_id, fk_category_id) VALUES ('zenscript', (SELECT category_id FROM categories WHERE name = 'DSL'));
            "#,
            kind: MigrationKind::Up
        }
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:clipCode.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
