# @see https://stackoverflow.com/questions/714100/os-detecting-makefile
ifeq ($(OS),Windows_NT)
    ifeq ($(PROCESSOR_ARCHITEW6432),AMD64)
	PROTOC_PLATFORM := win64
    else
        ifeq ($(PROCESSOR_ARCHITECTURE),AMD64)
	    PROTOC_PLATFORM := win64
        endif
        ifeq ($(PROCESSOR_ARCHITECTURE),x86)
	    PROTOC_PLATFORM := win32
        endif
    endif
else
    UNAME_S := $(shell uname -s)
    ifeq ($(UNAME_S),Linux)
	    PROTOC_PLATFORM := linux-x86_64
    endif
    ifeq ($(UNAME_S),Darwin)
        UNAME_P := $(findstring X86_64,$(shell uname -v))
        ifeq ($(UNAME_P),X86_64)
	    PROTOC_PLATFORM := osx-x86_64
        endif
    endif
endif

ifndef PROTOC_PLATFORM
    $(error unsupported platform $(UNAME_S):$(UNAME_P))
endif