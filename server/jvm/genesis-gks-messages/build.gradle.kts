dependencies {
    implementation("global.genesis:genesis-messages")
    compileOnly(project(path = ":genesis-gks-dictionary-cache", configuration = "codeGen"))
}

description = "genesis-gks-messages"