dependencies {
    compileOnly("global.genesis:genesis-dictionary")
    compileOnly("global.genesis:genesis-process")
    compileOnly("global.genesis:genesis-pal-execution")
    compileOnly(project(path = ":genesis-gks-dictionary-cache", configuration = "codeGen"))
}

description = "genesis-gks-config"
