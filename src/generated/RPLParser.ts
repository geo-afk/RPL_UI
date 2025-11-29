
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { RPLParserListener } from "./RPLParserListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class RPLParser extends antlr.Parser {
    public static readonly ROLE = 1;
    public static readonly USER = 2;
    public static readonly RESOURCE = 3;
    public static readonly CAN = 4;
    public static readonly EXTENDS = 5;
    public static readonly PERMISSIONS = 6;
    public static readonly ACTIONS = 7;
    public static readonly RESOURCES = 8;
    public static readonly CONDITIONS = 9;
    public static readonly GROUP = 10;
    public static readonly MEMBERS = 11;
    public static readonly VALID_FROM = 12;
    public static readonly VALID_UNTIL = 13;
    public static readonly AND = 14;
    public static readonly OR = 15;
    public static readonly NOT = 16;
    public static readonly READ = 17;
    public static readonly WRITE = 18;
    public static readonly MODIFY = 19;
    public static readonly START = 20;
    public static readonly STOP = 21;
    public static readonly DEPLOY = 22;
    public static readonly DELETE = 23;
    public static readonly EXECUTE = 24;
    public static readonly STAR = 25;
    public static readonly EQ = 26;
    public static readonly NE = 27;
    public static readonly LT = 28;
    public static readonly GT = 29;
    public static readonly LE = 30;
    public static readonly GE = 31;
    public static readonly PLUS = 32;
    public static readonly MINUS = 33;
    public static readonly DIV = 34;
    public static readonly IN = 35;
    public static readonly CONTAINS = 36;
    public static readonly LBRACKET = 37;
    public static readonly RBRACKET = 38;
    public static readonly LPAREN = 39;
    public static readonly RPAREN = 40;
    public static readonly LBRACE = 41;
    public static readonly RBRACE = 42;
    public static readonly COLON = 43;
    public static readonly COMMA = 44;
    public static readonly DOT = 45;
    public static readonly BOOLEAN = 46;
    public static readonly INTEGER = 47;
    public static readonly REAL = 48;
    public static readonly STRING = 49;
    public static readonly CHARACTER = 50;
    public static readonly IDENTIFIER = 51;
    public static readonly WS = 52;
    public static readonly LINE_COMMENT = 53;
    public static readonly BLOCK_COMMENT = 54;
    public static readonly RULE_program = 0;
    public static readonly RULE_statement = 1;
    public static readonly RULE_roleDeclaration = 2;
    public static readonly RULE_roleBody = 3;
    public static readonly RULE_rolePermissions = 4;
    public static readonly RULE_permissionBlock = 5;
    public static readonly RULE_userDeclaration = 6;
    public static readonly RULE_userBody = 7;
    public static readonly RULE_validPeriod = 8;
    public static readonly RULE_userRoles = 9;
    public static readonly RULE_validFrom = 10;
    public static readonly RULE_validUntil = 11;
    public static readonly RULE_resourceDeclaration = 12;
    public static readonly RULE_resourceBody = 13;
    public static readonly RULE_resourceAttributes = 14;
    public static readonly RULE_resourceAttribute = 15;
    public static readonly RULE_resourceList = 16;
    public static readonly RULE_resourceRef = 17;
    public static readonly RULE_groupDeclaration = 18;
    public static readonly RULE_groupBody = 19;
    public static readonly RULE_groupMembers = 20;
    public static readonly RULE_memberList = 21;
    public static readonly RULE_groupRoles = 22;
    public static readonly RULE_actionList = 23;
    public static readonly RULE_permission = 24;
    public static readonly RULE_condition = 25;
    public static readonly RULE_orCondition = 26;
    public static readonly RULE_andCondition = 27;
    public static readonly RULE_notCondition = 28;
    public static readonly RULE_primaryCondition = 29;
    public static readonly RULE_comparison = 30;
    public static readonly RULE_comparisonOp = 31;
    public static readonly RULE_expression = 32;
    public static readonly RULE_additiveExpr = 33;
    public static readonly RULE_multiplicativeExpr = 34;
    public static readonly RULE_unaryExpr = 35;
    public static readonly RULE_primaryExpr = 36;
    public static readonly RULE_atom = 37;
    public static readonly RULE_qualifiedName = 38;
    public static readonly RULE_value = 39;
    public static readonly RULE_valueList = 40;

    public static readonly literalNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, "'=='", "'!='", "'<'", "'>'", "'<='", "'>='", 
        "'+'", "'-'", "'/'", null, null, "'['", "']'", "'('", "')'", "'{'", 
        "'}'", "':'", "','", "'.'"
    ];

    public static readonly symbolicNames = [
        null, "ROLE", "USER", "RESOURCE", "CAN", "EXTENDS", "PERMISSIONS", 
        "ACTIONS", "RESOURCES", "CONDITIONS", "GROUP", "MEMBERS", "VALID_FROM", 
        "VALID_UNTIL", "AND", "OR", "NOT", "READ", "WRITE", "MODIFY", "START", 
        "STOP", "DEPLOY", "DELETE", "EXECUTE", "STAR", "EQ", "NE", "LT", 
        "GT", "LE", "GE", "PLUS", "MINUS", "DIV", "IN", "CONTAINS", "LBRACKET", 
        "RBRACKET", "LPAREN", "RPAREN", "LBRACE", "RBRACE", "COLON", "COMMA", 
        "DOT", "BOOLEAN", "INTEGER", "REAL", "STRING", "CHARACTER", "IDENTIFIER", 
        "WS", "LINE_COMMENT", "BLOCK_COMMENT"
    ];
    public static readonly ruleNames = [
        "program", "statement", "roleDeclaration", "roleBody", "rolePermissions", 
        "permissionBlock", "userDeclaration", "userBody", "validPeriod", 
        "userRoles", "validFrom", "validUntil", "resourceDeclaration", "resourceBody", 
        "resourceAttributes", "resourceAttribute", "resourceList", "resourceRef", 
        "groupDeclaration", "groupBody", "groupMembers", "memberList", "groupRoles", 
        "actionList", "permission", "condition", "orCondition", "andCondition", 
        "notCondition", "primaryCondition", "comparison", "comparisonOp", 
        "expression", "additiveExpr", "multiplicativeExpr", "unaryExpr", 
        "primaryExpr", "atom", "qualifiedName", "value", "valueList",
    ];

    public get grammarFileName(): string { return "RPLParser.g4"; }
    public get literalNames(): (string | null)[] { return RPLParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return RPLParser.symbolicNames; }
    public get ruleNames(): string[] { return RPLParser.ruleNames; }
    public get serializedATN(): number[] { return RPLParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, RPLParser._ATN, RPLParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, RPLParser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 85;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1038) !== 0)) {
                {
                {
                this.state = 82;
                this.statement();
                }
                }
                this.state = 87;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 88;
            this.match(RPLParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 2, RPLParser.RULE_statement);
        try {
            this.state = 94;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.ROLE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 90;
                this.roleDeclaration();
                }
                break;
            case RPLParser.USER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 91;
                this.userDeclaration();
                }
                break;
            case RPLParser.RESOURCE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 92;
                this.resourceDeclaration();
                }
                break;
            case RPLParser.GROUP:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 93;
                this.groupDeclaration();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public roleDeclaration(): RoleDeclarationContext {
        let localContext = new RoleDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 4, RPLParser.RULE_roleDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 96;
            this.match(RPLParser.ROLE);
            this.state = 97;
            this.match(RPLParser.IDENTIFIER);
            this.state = 100;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 5) {
                {
                this.state = 98;
                this.match(RPLParser.EXTENDS);
                this.state = 99;
                this.match(RPLParser.IDENTIFIER);
                }
            }

            this.state = 102;
            this.match(RPLParser.LBRACE);
            this.state = 103;
            this.roleBody();
            this.state = 104;
            this.match(RPLParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public roleBody(): RoleBodyContext {
        let localContext = new RoleBodyContext(this.context, this.state);
        this.enterRule(localContext, 6, RPLParser.RULE_roleBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 107;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 106;
                this.rolePermissions();
                }
                }
                this.state = 109;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 4 || _la === 6);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public rolePermissions(): RolePermissionsContext {
        let localContext = new RolePermissionsContext(this.context, this.state);
        this.enterRule(localContext, 8, RPLParser.RULE_rolePermissions);
        let _la: number;
        try {
            this.state = 142;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.PERMISSIONS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 111;
                this.match(RPLParser.PERMISSIONS);
                this.state = 112;
                this.match(RPLParser.COLON);
                this.state = 113;
                this.match(RPLParser.LBRACKET);
                this.state = 114;
                this.permissionBlock();
                this.state = 119;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 44) {
                    {
                    {
                    this.state = 115;
                    this.match(RPLParser.COMMA);
                    this.state = 116;
                    this.permissionBlock();
                    }
                    }
                    this.state = 121;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 122;
                this.match(RPLParser.RBRACKET);
                }
                break;
            case RPLParser.CAN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 124;
                this.match(RPLParser.CAN);
                this.state = 125;
                this.match(RPLParser.COLON);
                this.state = 126;
                this.match(RPLParser.LBRACKET);
                this.state = 127;
                this.permission();
                this.state = 132;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 44) {
                    {
                    {
                    this.state = 128;
                    this.match(RPLParser.COMMA);
                    this.state = 129;
                    this.permission();
                    }
                    }
                    this.state = 134;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 135;
                this.match(RPLParser.RBRACKET);
                this.state = 136;
                this.match(RPLParser.RESOURCES);
                this.state = 137;
                this.match(RPLParser.COLON);
                this.state = 138;
                this.match(RPLParser.LBRACKET);
                this.state = 139;
                this.resourceList();
                this.state = 140;
                this.match(RPLParser.RBRACKET);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public permissionBlock(): PermissionBlockContext {
        let localContext = new PermissionBlockContext(this.context, this.state);
        this.enterRule(localContext, 10, RPLParser.RULE_permissionBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 144;
            this.match(RPLParser.LBRACE);
            this.state = 145;
            this.match(RPLParser.ACTIONS);
            this.state = 146;
            this.match(RPLParser.COLON);
            this.state = 147;
            this.match(RPLParser.LBRACKET);
            this.state = 148;
            this.actionList();
            this.state = 149;
            this.match(RPLParser.RBRACKET);
            this.state = 150;
            this.match(RPLParser.COMMA);
            this.state = 151;
            this.match(RPLParser.RESOURCES);
            this.state = 152;
            this.match(RPLParser.COLON);
            this.state = 153;
            this.match(RPLParser.LBRACKET);
            this.state = 154;
            this.resourceList();
            this.state = 155;
            this.match(RPLParser.RBRACKET);
            this.state = 160;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 44) {
                {
                this.state = 156;
                this.match(RPLParser.COMMA);
                this.state = 157;
                this.match(RPLParser.CONDITIONS);
                this.state = 158;
                this.match(RPLParser.COLON);
                this.state = 159;
                this.condition();
                }
            }

            this.state = 162;
            this.match(RPLParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userDeclaration(): UserDeclarationContext {
        let localContext = new UserDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 12, RPLParser.RULE_userDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 164;
            this.match(RPLParser.USER);
            this.state = 165;
            this.match(RPLParser.IDENTIFIER);
            this.state = 166;
            this.match(RPLParser.LBRACE);
            this.state = 167;
            this.userBody();
            this.state = 168;
            this.match(RPLParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userBody(): UserBodyContext {
        let localContext = new UserBodyContext(this.context, this.state);
        this.enterRule(localContext, 14, RPLParser.RULE_userBody);
        let _la: number;
        try {
            this.state = 179;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 171;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1) {
                    {
                    this.state = 170;
                    this.userRoles();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 174;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1) {
                    {
                    this.state = 173;
                    this.userRoles();
                    }
                }

                this.state = 176;
                this.match(RPLParser.COMMA);
                this.state = 177;
                this.validPeriod();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 178;
                this.validPeriod();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public validPeriod(): ValidPeriodContext {
        let localContext = new ValidPeriodContext(this.context, this.state);
        this.enterRule(localContext, 16, RPLParser.RULE_validPeriod);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 181;
            this.validFrom();
            this.state = 182;
            this.match(RPLParser.COMMA);
            this.state = 183;
            this.validUntil();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userRoles(): UserRolesContext {
        let localContext = new UserRolesContext(this.context, this.state);
        this.enterRule(localContext, 18, RPLParser.RULE_userRoles);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 185;
            this.match(RPLParser.ROLE);
            this.state = 186;
            this.match(RPLParser.COLON);
            this.state = 187;
            this.match(RPLParser.LBRACKET);
            this.state = 188;
            this.match(RPLParser.IDENTIFIER);
            this.state = 193;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 44) {
                {
                {
                this.state = 189;
                this.match(RPLParser.COMMA);
                this.state = 190;
                this.match(RPLParser.IDENTIFIER);
                }
                }
                this.state = 195;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 196;
            this.match(RPLParser.RBRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public validFrom(): ValidFromContext {
        let localContext = new ValidFromContext(this.context, this.state);
        this.enterRule(localContext, 20, RPLParser.RULE_validFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 198;
            this.match(RPLParser.VALID_FROM);
            this.state = 199;
            this.match(RPLParser.COLON);
            this.state = 200;
            this.match(RPLParser.STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public validUntil(): ValidUntilContext {
        let localContext = new ValidUntilContext(this.context, this.state);
        this.enterRule(localContext, 22, RPLParser.RULE_validUntil);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 202;
            this.match(RPLParser.VALID_UNTIL);
            this.state = 203;
            this.match(RPLParser.COLON);
            this.state = 204;
            this.match(RPLParser.STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceDeclaration(): ResourceDeclarationContext {
        let localContext = new ResourceDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 24, RPLParser.RULE_resourceDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 206;
            this.match(RPLParser.RESOURCE);
            this.state = 207;
            this.match(RPLParser.IDENTIFIER);
            this.state = 208;
            this.match(RPLParser.LBRACE);
            this.state = 209;
            this.resourceBody();
            this.state = 210;
            this.match(RPLParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceBody(): ResourceBodyContext {
        let localContext = new ResourceBodyContext(this.context, this.state);
        this.enterRule(localContext, 26, RPLParser.RULE_resourceBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 213;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 51) {
                {
                this.state = 212;
                this.resourceAttributes();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceAttributes(): ResourceAttributesContext {
        let localContext = new ResourceAttributesContext(this.context, this.state);
        this.enterRule(localContext, 28, RPLParser.RULE_resourceAttributes);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 215;
            this.resourceAttribute();
            this.state = 220;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 44) {
                {
                {
                this.state = 216;
                this.match(RPLParser.COMMA);
                this.state = 217;
                this.resourceAttribute();
                }
                }
                this.state = 222;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceAttribute(): ResourceAttributeContext {
        let localContext = new ResourceAttributeContext(this.context, this.state);
        this.enterRule(localContext, 30, RPLParser.RULE_resourceAttribute);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 223;
            this.match(RPLParser.IDENTIFIER);
            this.state = 224;
            this.match(RPLParser.COLON);
            this.state = 225;
            this.value();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceList(): ResourceListContext {
        let localContext = new ResourceListContext(this.context, this.state);
        this.enterRule(localContext, 32, RPLParser.RULE_resourceList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 227;
            this.resourceRef();
            this.state = 232;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 44) {
                {
                {
                this.state = 228;
                this.match(RPLParser.COMMA);
                this.state = 229;
                this.resourceRef();
                }
                }
                this.state = 234;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public resourceRef(): ResourceRefContext {
        let localContext = new ResourceRefContext(this.context, this.state);
        this.enterRule(localContext, 34, RPLParser.RULE_resourceRef);
        let _la: number;
        try {
            this.state = 244;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 235;
                this.match(RPLParser.IDENTIFIER);
                this.state = 240;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 45) {
                    {
                    {
                    this.state = 236;
                    this.match(RPLParser.DOT);
                    this.state = 237;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 25 || _la === 51)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    }
                    }
                    this.state = 242;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case RPLParser.STRING:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 243;
                this.match(RPLParser.STRING);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupDeclaration(): GroupDeclarationContext {
        let localContext = new GroupDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 36, RPLParser.RULE_groupDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 246;
            this.match(RPLParser.GROUP);
            this.state = 247;
            this.match(RPLParser.IDENTIFIER);
            this.state = 248;
            this.match(RPLParser.LBRACE);
            this.state = 249;
            this.groupBody();
            this.state = 250;
            this.match(RPLParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupBody(): GroupBodyContext {
        let localContext = new GroupBodyContext(this.context, this.state);
        this.enterRule(localContext, 38, RPLParser.RULE_groupBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 253;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 252;
                this.groupMembers();
                }
            }

            this.state = 259;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 44) {
                {
                this.state = 255;
                this.match(RPLParser.COMMA);
                this.state = 257;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1) {
                    {
                    this.state = 256;
                    this.groupRoles();
                    }
                }

                }
            }

            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupMembers(): GroupMembersContext {
        let localContext = new GroupMembersContext(this.context, this.state);
        this.enterRule(localContext, 40, RPLParser.RULE_groupMembers);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 261;
            this.match(RPLParser.MEMBERS);
            this.state = 262;
            this.match(RPLParser.COLON);
            this.state = 263;
            this.match(RPLParser.LBRACKET);
            this.state = 264;
            this.memberList();
            this.state = 265;
            this.match(RPLParser.RBRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public memberList(): MemberListContext {
        let localContext = new MemberListContext(this.context, this.state);
        this.enterRule(localContext, 42, RPLParser.RULE_memberList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 267;
            this.match(RPLParser.IDENTIFIER);
            this.state = 272;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 44) {
                {
                {
                this.state = 268;
                this.match(RPLParser.COMMA);
                this.state = 269;
                this.match(RPLParser.IDENTIFIER);
                }
                }
                this.state = 274;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupRoles(): GroupRolesContext {
        let localContext = new GroupRolesContext(this.context, this.state);
        this.enterRule(localContext, 44, RPLParser.RULE_groupRoles);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 275;
            this.match(RPLParser.ROLE);
            this.state = 276;
            this.match(RPLParser.COLON);
            this.state = 277;
            this.match(RPLParser.LBRACKET);
            this.state = 278;
            this.match(RPLParser.IDENTIFIER);
            this.state = 283;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 44) {
                {
                {
                this.state = 279;
                this.match(RPLParser.COMMA);
                this.state = 280;
                this.match(RPLParser.IDENTIFIER);
                }
                }
                this.state = 285;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 286;
            this.match(RPLParser.RBRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public actionList(): ActionListContext {
        let localContext = new ActionListContext(this.context, this.state);
        this.enterRule(localContext, 46, RPLParser.RULE_actionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 288;
            this.permission();
            this.state = 293;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 44) {
                {
                {
                this.state = 289;
                this.match(RPLParser.COMMA);
                this.state = 290;
                this.permission();
                }
                }
                this.state = 295;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public permission(): PermissionContext {
        let localContext = new PermissionContext(this.context, this.state);
        this.enterRule(localContext, 48, RPLParser.RULE_permission);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 296;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 66977792) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public condition(): ConditionContext {
        let localContext = new ConditionContext(this.context, this.state);
        this.enterRule(localContext, 50, RPLParser.RULE_condition);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 298;
            this.orCondition();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public orCondition(): OrConditionContext {
        let localContext = new OrConditionContext(this.context, this.state);
        this.enterRule(localContext, 52, RPLParser.RULE_orCondition);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 300;
            this.andCondition();
            this.state = 305;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 15) {
                {
                {
                this.state = 301;
                this.match(RPLParser.OR);
                this.state = 302;
                this.andCondition();
                }
                }
                this.state = 307;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public andCondition(): AndConditionContext {
        let localContext = new AndConditionContext(this.context, this.state);
        this.enterRule(localContext, 54, RPLParser.RULE_andCondition);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 308;
            this.notCondition();
            this.state = 313;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 14) {
                {
                {
                this.state = 309;
                this.match(RPLParser.AND);
                this.state = 310;
                this.notCondition();
                }
                }
                this.state = 315;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public notCondition(): NotConditionContext {
        let localContext = new NotConditionContext(this.context, this.state);
        this.enterRule(localContext, 56, RPLParser.RULE_notCondition);
        try {
            this.state = 319;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.NOT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 316;
                this.match(RPLParser.NOT);
                this.state = 317;
                this.notCondition();
                }
                break;
            case RPLParser.PLUS:
            case RPLParser.MINUS:
            case RPLParser.LPAREN:
            case RPLParser.BOOLEAN:
            case RPLParser.INTEGER:
            case RPLParser.REAL:
            case RPLParser.STRING:
            case RPLParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 318;
                this.primaryCondition();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public primaryCondition(): PrimaryConditionContext {
        let localContext = new PrimaryConditionContext(this.context, this.state);
        this.enterRule(localContext, 58, RPLParser.RULE_primaryCondition);
        try {
            this.state = 326;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 321;
                this.match(RPLParser.LPAREN);
                this.state = 322;
                this.condition();
                this.state = 323;
                this.match(RPLParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 325;
                this.comparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public comparison(): ComparisonContext {
        let localContext = new ComparisonContext(this.context, this.state);
        this.enterRule(localContext, 60, RPLParser.RULE_comparison);
        try {
            this.state = 342;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 27, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 328;
                this.expression();
                this.state = 329;
                this.comparisonOp();
                this.state = 330;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 332;
                this.expression();
                this.state = 333;
                this.match(RPLParser.IN);
                this.state = 334;
                this.match(RPLParser.LBRACKET);
                this.state = 335;
                this.valueList();
                this.state = 336;
                this.match(RPLParser.RBRACKET);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 338;
                this.expression();
                this.state = 339;
                this.match(RPLParser.CONTAINS);
                this.state = 340;
                this.value();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public comparisonOp(): ComparisonOpContext {
        let localContext = new ComparisonOpContext(this.context, this.state);
        this.enterRule(localContext, 62, RPLParser.RULE_comparisonOp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 344;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4227858432) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 64, RPLParser.RULE_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 346;
            this.additiveExpr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public additiveExpr(): AdditiveExprContext {
        let localContext = new AdditiveExprContext(this.context, this.state);
        this.enterRule(localContext, 66, RPLParser.RULE_additiveExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 348;
            this.multiplicativeExpr();
            this.state = 353;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 32 || _la === 33) {
                {
                {
                this.state = 349;
                _la = this.tokenStream.LA(1);
                if(!(_la === 32 || _la === 33)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 350;
                this.multiplicativeExpr();
                }
                }
                this.state = 355;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public multiplicativeExpr(): MultiplicativeExprContext {
        let localContext = new MultiplicativeExprContext(this.context, this.state);
        this.enterRule(localContext, 68, RPLParser.RULE_multiplicativeExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 356;
            this.unaryExpr();
            this.state = 361;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 25 || _la === 34) {
                {
                {
                this.state = 357;
                _la = this.tokenStream.LA(1);
                if(!(_la === 25 || _la === 34)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 358;
                this.unaryExpr();
                }
                }
                this.state = 363;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unaryExpr(): UnaryExprContext {
        let localContext = new UnaryExprContext(this.context, this.state);
        this.enterRule(localContext, 70, RPLParser.RULE_unaryExpr);
        try {
            this.state = 369;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.PLUS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 364;
                this.match(RPLParser.PLUS);
                this.state = 365;
                this.unaryExpr();
                }
                break;
            case RPLParser.MINUS:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 366;
                this.match(RPLParser.MINUS);
                this.state = 367;
                this.unaryExpr();
                }
                break;
            case RPLParser.LPAREN:
            case RPLParser.BOOLEAN:
            case RPLParser.INTEGER:
            case RPLParser.REAL:
            case RPLParser.STRING:
            case RPLParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 368;
                this.primaryExpr();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public primaryExpr(): PrimaryExprContext {
        let localContext = new PrimaryExprContext(this.context, this.state);
        this.enterRule(localContext, 72, RPLParser.RULE_primaryExpr);
        try {
            this.state = 376;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 371;
                this.match(RPLParser.LPAREN);
                this.state = 372;
                this.expression();
                this.state = 373;
                this.match(RPLParser.RPAREN);
                }
                break;
            case RPLParser.BOOLEAN:
            case RPLParser.INTEGER:
            case RPLParser.REAL:
            case RPLParser.STRING:
            case RPLParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 375;
                this.atom();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public atom(): AtomContext {
        let localContext = new AtomContext(this.context, this.state);
        this.enterRule(localContext, 74, RPLParser.RULE_atom);
        try {
            this.state = 383;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.INTEGER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 378;
                this.match(RPLParser.INTEGER);
                }
                break;
            case RPLParser.REAL:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 379;
                this.match(RPLParser.REAL);
                }
                break;
            case RPLParser.STRING:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 380;
                this.match(RPLParser.STRING);
                }
                break;
            case RPLParser.BOOLEAN:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 381;
                this.match(RPLParser.BOOLEAN);
                }
                break;
            case RPLParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 382;
                this.qualifiedName();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public qualifiedName(): QualifiedNameContext {
        let localContext = new QualifiedNameContext(this.context, this.state);
        this.enterRule(localContext, 76, RPLParser.RULE_qualifiedName);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 385;
            this.match(RPLParser.IDENTIFIER);
            this.state = 390;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 45) {
                {
                {
                this.state = 386;
                this.match(RPLParser.DOT);
                this.state = 387;
                this.match(RPLParser.IDENTIFIER);
                }
                }
                this.state = 392;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public value(): ValueContext {
        let localContext = new ValueContext(this.context, this.state);
        this.enterRule(localContext, 78, RPLParser.RULE_value);
        try {
            this.state = 403;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RPLParser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 393;
                this.match(RPLParser.STRING);
                }
                break;
            case RPLParser.CHARACTER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 394;
                this.match(RPLParser.CHARACTER);
                }
                break;
            case RPLParser.INTEGER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 395;
                this.match(RPLParser.INTEGER);
                }
                break;
            case RPLParser.REAL:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 396;
                this.match(RPLParser.REAL);
                }
                break;
            case RPLParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 397;
                this.match(RPLParser.IDENTIFIER);
                }
                break;
            case RPLParser.BOOLEAN:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 398;
                this.match(RPLParser.BOOLEAN);
                }
                break;
            case RPLParser.LBRACKET:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 399;
                this.match(RPLParser.LBRACKET);
                this.state = 400;
                this.valueList();
                this.state = 401;
                this.match(RPLParser.RBRACKET);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public valueList(): ValueListContext {
        let localContext = new ValueListContext(this.context, this.state);
        this.enterRule(localContext, 80, RPLParser.RULE_valueList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 405;
            this.value();
            this.state = 410;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 44) {
                {
                {
                this.state = 406;
                this.match(RPLParser.COMMA);
                this.state = 407;
                this.value();
                }
                }
                this.state = 412;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public static readonly _serializedATN: number[] = [
        4,1,54,414,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,1,0,5,0,84,8,0,10,0,12,0,87,9,0,1,0,1,0,1,1,1,1,1,1,1,
        1,3,1,95,8,1,1,2,1,2,1,2,1,2,3,2,101,8,2,1,2,1,2,1,2,1,2,1,3,4,3,
        108,8,3,11,3,12,3,109,1,4,1,4,1,4,1,4,1,4,1,4,5,4,118,8,4,10,4,12,
        4,121,9,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,5,4,131,8,4,10,4,12,4,
        134,9,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,143,8,4,1,5,1,5,1,5,1,5,
        1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,3,5,161,8,5,1,5,
        1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,7,3,7,172,8,7,1,7,3,7,175,8,7,1,7,
        1,7,1,7,3,7,180,8,7,1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,5,9,
        192,8,9,10,9,12,9,195,9,9,1,9,1,9,1,10,1,10,1,10,1,10,1,11,1,11,
        1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,13,3,13,214,8,13,1,14,
        1,14,1,14,5,14,219,8,14,10,14,12,14,222,9,14,1,15,1,15,1,15,1,15,
        1,16,1,16,1,16,5,16,231,8,16,10,16,12,16,234,9,16,1,17,1,17,1,17,
        5,17,239,8,17,10,17,12,17,242,9,17,1,17,3,17,245,8,17,1,18,1,18,
        1,18,1,18,1,18,1,18,1,19,3,19,254,8,19,1,19,1,19,3,19,258,8,19,3,
        19,260,8,19,1,20,1,20,1,20,1,20,1,20,1,20,1,21,1,21,1,21,5,21,271,
        8,21,10,21,12,21,274,9,21,1,22,1,22,1,22,1,22,1,22,1,22,5,22,282,
        8,22,10,22,12,22,285,9,22,1,22,1,22,1,23,1,23,1,23,5,23,292,8,23,
        10,23,12,23,295,9,23,1,24,1,24,1,25,1,25,1,26,1,26,1,26,5,26,304,
        8,26,10,26,12,26,307,9,26,1,27,1,27,1,27,5,27,312,8,27,10,27,12,
        27,315,9,27,1,28,1,28,1,28,3,28,320,8,28,1,29,1,29,1,29,1,29,1,29,
        3,29,327,8,29,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,
        1,30,1,30,1,30,1,30,3,30,343,8,30,1,31,1,31,1,32,1,32,1,33,1,33,
        1,33,5,33,352,8,33,10,33,12,33,355,9,33,1,34,1,34,1,34,5,34,360,
        8,34,10,34,12,34,363,9,34,1,35,1,35,1,35,1,35,1,35,3,35,370,8,35,
        1,36,1,36,1,36,1,36,1,36,3,36,377,8,36,1,37,1,37,1,37,1,37,1,37,
        3,37,384,8,37,1,38,1,38,1,38,5,38,389,8,38,10,38,12,38,392,9,38,
        1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,3,39,404,8,39,
        1,40,1,40,1,40,5,40,409,8,40,10,40,12,40,412,9,40,1,40,0,0,41,0,
        2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,
        48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,0,5,2,0,25,25,
        51,51,1,0,17,25,1,0,26,31,1,0,32,33,2,0,25,25,34,34,421,0,85,1,0,
        0,0,2,94,1,0,0,0,4,96,1,0,0,0,6,107,1,0,0,0,8,142,1,0,0,0,10,144,
        1,0,0,0,12,164,1,0,0,0,14,179,1,0,0,0,16,181,1,0,0,0,18,185,1,0,
        0,0,20,198,1,0,0,0,22,202,1,0,0,0,24,206,1,0,0,0,26,213,1,0,0,0,
        28,215,1,0,0,0,30,223,1,0,0,0,32,227,1,0,0,0,34,244,1,0,0,0,36,246,
        1,0,0,0,38,253,1,0,0,0,40,261,1,0,0,0,42,267,1,0,0,0,44,275,1,0,
        0,0,46,288,1,0,0,0,48,296,1,0,0,0,50,298,1,0,0,0,52,300,1,0,0,0,
        54,308,1,0,0,0,56,319,1,0,0,0,58,326,1,0,0,0,60,342,1,0,0,0,62,344,
        1,0,0,0,64,346,1,0,0,0,66,348,1,0,0,0,68,356,1,0,0,0,70,369,1,0,
        0,0,72,376,1,0,0,0,74,383,1,0,0,0,76,385,1,0,0,0,78,403,1,0,0,0,
        80,405,1,0,0,0,82,84,3,2,1,0,83,82,1,0,0,0,84,87,1,0,0,0,85,83,1,
        0,0,0,85,86,1,0,0,0,86,88,1,0,0,0,87,85,1,0,0,0,88,89,5,0,0,1,89,
        1,1,0,0,0,90,95,3,4,2,0,91,95,3,12,6,0,92,95,3,24,12,0,93,95,3,36,
        18,0,94,90,1,0,0,0,94,91,1,0,0,0,94,92,1,0,0,0,94,93,1,0,0,0,95,
        3,1,0,0,0,96,97,5,1,0,0,97,100,5,51,0,0,98,99,5,5,0,0,99,101,5,51,
        0,0,100,98,1,0,0,0,100,101,1,0,0,0,101,102,1,0,0,0,102,103,5,41,
        0,0,103,104,3,6,3,0,104,105,5,42,0,0,105,5,1,0,0,0,106,108,3,8,4,
        0,107,106,1,0,0,0,108,109,1,0,0,0,109,107,1,0,0,0,109,110,1,0,0,
        0,110,7,1,0,0,0,111,112,5,6,0,0,112,113,5,43,0,0,113,114,5,37,0,
        0,114,119,3,10,5,0,115,116,5,44,0,0,116,118,3,10,5,0,117,115,1,0,
        0,0,118,121,1,0,0,0,119,117,1,0,0,0,119,120,1,0,0,0,120,122,1,0,
        0,0,121,119,1,0,0,0,122,123,5,38,0,0,123,143,1,0,0,0,124,125,5,4,
        0,0,125,126,5,43,0,0,126,127,5,37,0,0,127,132,3,48,24,0,128,129,
        5,44,0,0,129,131,3,48,24,0,130,128,1,0,0,0,131,134,1,0,0,0,132,130,
        1,0,0,0,132,133,1,0,0,0,133,135,1,0,0,0,134,132,1,0,0,0,135,136,
        5,38,0,0,136,137,5,8,0,0,137,138,5,43,0,0,138,139,5,37,0,0,139,140,
        3,32,16,0,140,141,5,38,0,0,141,143,1,0,0,0,142,111,1,0,0,0,142,124,
        1,0,0,0,143,9,1,0,0,0,144,145,5,41,0,0,145,146,5,7,0,0,146,147,5,
        43,0,0,147,148,5,37,0,0,148,149,3,46,23,0,149,150,5,38,0,0,150,151,
        5,44,0,0,151,152,5,8,0,0,152,153,5,43,0,0,153,154,5,37,0,0,154,155,
        3,32,16,0,155,160,5,38,0,0,156,157,5,44,0,0,157,158,5,9,0,0,158,
        159,5,43,0,0,159,161,3,50,25,0,160,156,1,0,0,0,160,161,1,0,0,0,161,
        162,1,0,0,0,162,163,5,42,0,0,163,11,1,0,0,0,164,165,5,2,0,0,165,
        166,5,51,0,0,166,167,5,41,0,0,167,168,3,14,7,0,168,169,5,42,0,0,
        169,13,1,0,0,0,170,172,3,18,9,0,171,170,1,0,0,0,171,172,1,0,0,0,
        172,180,1,0,0,0,173,175,3,18,9,0,174,173,1,0,0,0,174,175,1,0,0,0,
        175,176,1,0,0,0,176,177,5,44,0,0,177,180,3,16,8,0,178,180,3,16,8,
        0,179,171,1,0,0,0,179,174,1,0,0,0,179,178,1,0,0,0,180,15,1,0,0,0,
        181,182,3,20,10,0,182,183,5,44,0,0,183,184,3,22,11,0,184,17,1,0,
        0,0,185,186,5,1,0,0,186,187,5,43,0,0,187,188,5,37,0,0,188,193,5,
        51,0,0,189,190,5,44,0,0,190,192,5,51,0,0,191,189,1,0,0,0,192,195,
        1,0,0,0,193,191,1,0,0,0,193,194,1,0,0,0,194,196,1,0,0,0,195,193,
        1,0,0,0,196,197,5,38,0,0,197,19,1,0,0,0,198,199,5,12,0,0,199,200,
        5,43,0,0,200,201,5,49,0,0,201,21,1,0,0,0,202,203,5,13,0,0,203,204,
        5,43,0,0,204,205,5,49,0,0,205,23,1,0,0,0,206,207,5,3,0,0,207,208,
        5,51,0,0,208,209,5,41,0,0,209,210,3,26,13,0,210,211,5,42,0,0,211,
        25,1,0,0,0,212,214,3,28,14,0,213,212,1,0,0,0,213,214,1,0,0,0,214,
        27,1,0,0,0,215,220,3,30,15,0,216,217,5,44,0,0,217,219,3,30,15,0,
        218,216,1,0,0,0,219,222,1,0,0,0,220,218,1,0,0,0,220,221,1,0,0,0,
        221,29,1,0,0,0,222,220,1,0,0,0,223,224,5,51,0,0,224,225,5,43,0,0,
        225,226,3,78,39,0,226,31,1,0,0,0,227,232,3,34,17,0,228,229,5,44,
        0,0,229,231,3,34,17,0,230,228,1,0,0,0,231,234,1,0,0,0,232,230,1,
        0,0,0,232,233,1,0,0,0,233,33,1,0,0,0,234,232,1,0,0,0,235,240,5,51,
        0,0,236,237,5,45,0,0,237,239,7,0,0,0,238,236,1,0,0,0,239,242,1,0,
        0,0,240,238,1,0,0,0,240,241,1,0,0,0,241,245,1,0,0,0,242,240,1,0,
        0,0,243,245,5,49,0,0,244,235,1,0,0,0,244,243,1,0,0,0,245,35,1,0,
        0,0,246,247,5,10,0,0,247,248,5,51,0,0,248,249,5,41,0,0,249,250,3,
        38,19,0,250,251,5,42,0,0,251,37,1,0,0,0,252,254,3,40,20,0,253,252,
        1,0,0,0,253,254,1,0,0,0,254,259,1,0,0,0,255,257,5,44,0,0,256,258,
        3,44,22,0,257,256,1,0,0,0,257,258,1,0,0,0,258,260,1,0,0,0,259,255,
        1,0,0,0,259,260,1,0,0,0,260,39,1,0,0,0,261,262,5,11,0,0,262,263,
        5,43,0,0,263,264,5,37,0,0,264,265,3,42,21,0,265,266,5,38,0,0,266,
        41,1,0,0,0,267,272,5,51,0,0,268,269,5,44,0,0,269,271,5,51,0,0,270,
        268,1,0,0,0,271,274,1,0,0,0,272,270,1,0,0,0,272,273,1,0,0,0,273,
        43,1,0,0,0,274,272,1,0,0,0,275,276,5,1,0,0,276,277,5,43,0,0,277,
        278,5,37,0,0,278,283,5,51,0,0,279,280,5,44,0,0,280,282,5,51,0,0,
        281,279,1,0,0,0,282,285,1,0,0,0,283,281,1,0,0,0,283,284,1,0,0,0,
        284,286,1,0,0,0,285,283,1,0,0,0,286,287,5,38,0,0,287,45,1,0,0,0,
        288,293,3,48,24,0,289,290,5,44,0,0,290,292,3,48,24,0,291,289,1,0,
        0,0,292,295,1,0,0,0,293,291,1,0,0,0,293,294,1,0,0,0,294,47,1,0,0,
        0,295,293,1,0,0,0,296,297,7,1,0,0,297,49,1,0,0,0,298,299,3,52,26,
        0,299,51,1,0,0,0,300,305,3,54,27,0,301,302,5,15,0,0,302,304,3,54,
        27,0,303,301,1,0,0,0,304,307,1,0,0,0,305,303,1,0,0,0,305,306,1,0,
        0,0,306,53,1,0,0,0,307,305,1,0,0,0,308,313,3,56,28,0,309,310,5,14,
        0,0,310,312,3,56,28,0,311,309,1,0,0,0,312,315,1,0,0,0,313,311,1,
        0,0,0,313,314,1,0,0,0,314,55,1,0,0,0,315,313,1,0,0,0,316,317,5,16,
        0,0,317,320,3,56,28,0,318,320,3,58,29,0,319,316,1,0,0,0,319,318,
        1,0,0,0,320,57,1,0,0,0,321,322,5,39,0,0,322,323,3,50,25,0,323,324,
        5,40,0,0,324,327,1,0,0,0,325,327,3,60,30,0,326,321,1,0,0,0,326,325,
        1,0,0,0,327,59,1,0,0,0,328,329,3,64,32,0,329,330,3,62,31,0,330,331,
        3,64,32,0,331,343,1,0,0,0,332,333,3,64,32,0,333,334,5,35,0,0,334,
        335,5,37,0,0,335,336,3,80,40,0,336,337,5,38,0,0,337,343,1,0,0,0,
        338,339,3,64,32,0,339,340,5,36,0,0,340,341,3,78,39,0,341,343,1,0,
        0,0,342,328,1,0,0,0,342,332,1,0,0,0,342,338,1,0,0,0,343,61,1,0,0,
        0,344,345,7,2,0,0,345,63,1,0,0,0,346,347,3,66,33,0,347,65,1,0,0,
        0,348,353,3,68,34,0,349,350,7,3,0,0,350,352,3,68,34,0,351,349,1,
        0,0,0,352,355,1,0,0,0,353,351,1,0,0,0,353,354,1,0,0,0,354,67,1,0,
        0,0,355,353,1,0,0,0,356,361,3,70,35,0,357,358,7,4,0,0,358,360,3,
        70,35,0,359,357,1,0,0,0,360,363,1,0,0,0,361,359,1,0,0,0,361,362,
        1,0,0,0,362,69,1,0,0,0,363,361,1,0,0,0,364,365,5,32,0,0,365,370,
        3,70,35,0,366,367,5,33,0,0,367,370,3,70,35,0,368,370,3,72,36,0,369,
        364,1,0,0,0,369,366,1,0,0,0,369,368,1,0,0,0,370,71,1,0,0,0,371,372,
        5,39,0,0,372,373,3,64,32,0,373,374,5,40,0,0,374,377,1,0,0,0,375,
        377,3,74,37,0,376,371,1,0,0,0,376,375,1,0,0,0,377,73,1,0,0,0,378,
        384,5,47,0,0,379,384,5,48,0,0,380,384,5,49,0,0,381,384,5,46,0,0,
        382,384,3,76,38,0,383,378,1,0,0,0,383,379,1,0,0,0,383,380,1,0,0,
        0,383,381,1,0,0,0,383,382,1,0,0,0,384,75,1,0,0,0,385,390,5,51,0,
        0,386,387,5,45,0,0,387,389,5,51,0,0,388,386,1,0,0,0,389,392,1,0,
        0,0,390,388,1,0,0,0,390,391,1,0,0,0,391,77,1,0,0,0,392,390,1,0,0,
        0,393,404,5,49,0,0,394,404,5,50,0,0,395,404,5,47,0,0,396,404,5,48,
        0,0,397,404,5,51,0,0,398,404,5,46,0,0,399,400,5,37,0,0,400,401,3,
        80,40,0,401,402,5,38,0,0,402,404,1,0,0,0,403,393,1,0,0,0,403,394,
        1,0,0,0,403,395,1,0,0,0,403,396,1,0,0,0,403,397,1,0,0,0,403,398,
        1,0,0,0,403,399,1,0,0,0,404,79,1,0,0,0,405,410,3,78,39,0,406,407,
        5,44,0,0,407,409,3,78,39,0,408,406,1,0,0,0,409,412,1,0,0,0,410,408,
        1,0,0,0,410,411,1,0,0,0,411,81,1,0,0,0,412,410,1,0,0,0,36,85,94,
        100,109,119,132,142,160,171,174,179,193,213,220,232,240,244,253,
        257,259,272,283,293,305,313,319,326,342,353,361,369,376,383,390,
        403,410
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!RPLParser.__ATN) {
            RPLParser.__ATN = new antlr.ATNDeserializer().deserialize(RPLParser._serializedATN);
        }

        return RPLParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(RPLParser.literalNames, RPLParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return RPLParser.vocabulary;
    }

    private static readonly decisionsToDFA = RPLParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(RPLParser.EOF, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_program;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitProgram) {
             listener.exitProgram(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public roleDeclaration(): RoleDeclarationContext | null {
        return this.getRuleContext(0, RoleDeclarationContext);
    }
    public userDeclaration(): UserDeclarationContext | null {
        return this.getRuleContext(0, UserDeclarationContext);
    }
    public resourceDeclaration(): ResourceDeclarationContext | null {
        return this.getRuleContext(0, ResourceDeclarationContext);
    }
    public groupDeclaration(): GroupDeclarationContext | null {
        return this.getRuleContext(0, GroupDeclarationContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_statement;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
}


export class RoleDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ROLE(): antlr.TerminalNode {
        return this.getToken(RPLParser.ROLE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.IDENTIFIER);
    	} else {
    		return this.getToken(RPLParser.IDENTIFIER, i);
    	}
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACE, 0)!;
    }
    public roleBody(): RoleBodyContext {
        return this.getRuleContext(0, RoleBodyContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACE, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.EXTENDS, 0);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_roleDeclaration;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterRoleDeclaration) {
             listener.enterRoleDeclaration(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitRoleDeclaration) {
             listener.exitRoleDeclaration(this);
        }
    }
}


export class RoleBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public rolePermissions(): RolePermissionsContext[];
    public rolePermissions(i: number): RolePermissionsContext | null;
    public rolePermissions(i?: number): RolePermissionsContext[] | RolePermissionsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RolePermissionsContext);
        }

        return this.getRuleContext(i, RolePermissionsContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_roleBody;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterRoleBody) {
             listener.enterRoleBody(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitRoleBody) {
             listener.exitRoleBody(this);
        }
    }
}


export class RolePermissionsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PERMISSIONS(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.PERMISSIONS, 0);
    }
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COLON);
    	} else {
    		return this.getToken(RPLParser.COLON, i);
    	}
    }
    public LBRACKET(): antlr.TerminalNode[];
    public LBRACKET(i: number): antlr.TerminalNode | null;
    public LBRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.LBRACKET);
    	} else {
    		return this.getToken(RPLParser.LBRACKET, i);
    	}
    }
    public permissionBlock(): PermissionBlockContext[];
    public permissionBlock(i: number): PermissionBlockContext | null;
    public permissionBlock(i?: number): PermissionBlockContext[] | PermissionBlockContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PermissionBlockContext);
        }

        return this.getRuleContext(i, PermissionBlockContext);
    }
    public RBRACKET(): antlr.TerminalNode[];
    public RBRACKET(i: number): antlr.TerminalNode | null;
    public RBRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.RBRACKET);
    	} else {
    		return this.getToken(RPLParser.RBRACKET, i);
    	}
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public CAN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.CAN, 0);
    }
    public permission(): PermissionContext[];
    public permission(i: number): PermissionContext | null;
    public permission(i?: number): PermissionContext[] | PermissionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PermissionContext);
        }

        return this.getRuleContext(i, PermissionContext);
    }
    public RESOURCES(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.RESOURCES, 0);
    }
    public resourceList(): ResourceListContext | null {
        return this.getRuleContext(0, ResourceListContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_rolePermissions;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterRolePermissions) {
             listener.enterRolePermissions(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitRolePermissions) {
             listener.exitRolePermissions(this);
        }
    }
}


export class PermissionBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACE, 0)!;
    }
    public ACTIONS(): antlr.TerminalNode {
        return this.getToken(RPLParser.ACTIONS, 0)!;
    }
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COLON);
    	} else {
    		return this.getToken(RPLParser.COLON, i);
    	}
    }
    public LBRACKET(): antlr.TerminalNode[];
    public LBRACKET(i: number): antlr.TerminalNode | null;
    public LBRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.LBRACKET);
    	} else {
    		return this.getToken(RPLParser.LBRACKET, i);
    	}
    }
    public actionList(): ActionListContext {
        return this.getRuleContext(0, ActionListContext)!;
    }
    public RBRACKET(): antlr.TerminalNode[];
    public RBRACKET(i: number): antlr.TerminalNode | null;
    public RBRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.RBRACKET);
    	} else {
    		return this.getToken(RPLParser.RBRACKET, i);
    	}
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public RESOURCES(): antlr.TerminalNode {
        return this.getToken(RPLParser.RESOURCES, 0)!;
    }
    public resourceList(): ResourceListContext {
        return this.getRuleContext(0, ResourceListContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACE, 0)!;
    }
    public CONDITIONS(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.CONDITIONS, 0);
    }
    public condition(): ConditionContext | null {
        return this.getRuleContext(0, ConditionContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_permissionBlock;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterPermissionBlock) {
             listener.enterPermissionBlock(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitPermissionBlock) {
             listener.exitPermissionBlock(this);
        }
    }
}


export class UserDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public USER(): antlr.TerminalNode {
        return this.getToken(RPLParser.USER, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RPLParser.IDENTIFIER, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACE, 0)!;
    }
    public userBody(): UserBodyContext {
        return this.getRuleContext(0, UserBodyContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACE, 0)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_userDeclaration;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterUserDeclaration) {
             listener.enterUserDeclaration(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitUserDeclaration) {
             listener.exitUserDeclaration(this);
        }
    }
}


export class UserBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public userRoles(): UserRolesContext | null {
        return this.getRuleContext(0, UserRolesContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.COMMA, 0);
    }
    public validPeriod(): ValidPeriodContext | null {
        return this.getRuleContext(0, ValidPeriodContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_userBody;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterUserBody) {
             listener.enterUserBody(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitUserBody) {
             listener.exitUserBody(this);
        }
    }
}


export class ValidPeriodContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public validFrom(): ValidFromContext {
        return this.getRuleContext(0, ValidFromContext)!;
    }
    public COMMA(): antlr.TerminalNode {
        return this.getToken(RPLParser.COMMA, 0)!;
    }
    public validUntil(): ValidUntilContext {
        return this.getRuleContext(0, ValidUntilContext)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_validPeriod;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterValidPeriod) {
             listener.enterValidPeriod(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitValidPeriod) {
             listener.exitValidPeriod(this);
        }
    }
}


export class UserRolesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ROLE(): antlr.TerminalNode {
        return this.getToken(RPLParser.ROLE, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(RPLParser.COLON, 0)!;
    }
    public LBRACKET(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACKET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.IDENTIFIER);
    	} else {
    		return this.getToken(RPLParser.IDENTIFIER, i);
    	}
    }
    public RBRACKET(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACKET, 0)!;
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_userRoles;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterUserRoles) {
             listener.enterUserRoles(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitUserRoles) {
             listener.exitUserRoles(this);
        }
    }
}


export class ValidFromContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VALID_FROM(): antlr.TerminalNode {
        return this.getToken(RPLParser.VALID_FROM, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(RPLParser.COLON, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(RPLParser.STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_validFrom;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterValidFrom) {
             listener.enterValidFrom(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitValidFrom) {
             listener.exitValidFrom(this);
        }
    }
}


export class ValidUntilContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VALID_UNTIL(): antlr.TerminalNode {
        return this.getToken(RPLParser.VALID_UNTIL, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(RPLParser.COLON, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(RPLParser.STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_validUntil;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterValidUntil) {
             listener.enterValidUntil(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitValidUntil) {
             listener.exitValidUntil(this);
        }
    }
}


export class ResourceDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public RESOURCE(): antlr.TerminalNode {
        return this.getToken(RPLParser.RESOURCE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RPLParser.IDENTIFIER, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACE, 0)!;
    }
    public resourceBody(): ResourceBodyContext {
        return this.getRuleContext(0, ResourceBodyContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACE, 0)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_resourceDeclaration;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterResourceDeclaration) {
             listener.enterResourceDeclaration(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitResourceDeclaration) {
             listener.exitResourceDeclaration(this);
        }
    }
}


export class ResourceBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public resourceAttributes(): ResourceAttributesContext | null {
        return this.getRuleContext(0, ResourceAttributesContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_resourceBody;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterResourceBody) {
             listener.enterResourceBody(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitResourceBody) {
             listener.exitResourceBody(this);
        }
    }
}


export class ResourceAttributesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public resourceAttribute(): ResourceAttributeContext[];
    public resourceAttribute(i: number): ResourceAttributeContext | null;
    public resourceAttribute(i?: number): ResourceAttributeContext[] | ResourceAttributeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ResourceAttributeContext);
        }

        return this.getRuleContext(i, ResourceAttributeContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_resourceAttributes;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterResourceAttributes) {
             listener.enterResourceAttributes(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitResourceAttributes) {
             listener.exitResourceAttributes(this);
        }
    }
}


export class ResourceAttributeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RPLParser.IDENTIFIER, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(RPLParser.COLON, 0)!;
    }
    public value(): ValueContext {
        return this.getRuleContext(0, ValueContext)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_resourceAttribute;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterResourceAttribute) {
             listener.enterResourceAttribute(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitResourceAttribute) {
             listener.exitResourceAttribute(this);
        }
    }
}


export class ResourceListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public resourceRef(): ResourceRefContext[];
    public resourceRef(i: number): ResourceRefContext | null;
    public resourceRef(i?: number): ResourceRefContext[] | ResourceRefContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ResourceRefContext);
        }

        return this.getRuleContext(i, ResourceRefContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_resourceList;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterResourceList) {
             listener.enterResourceList(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitResourceList) {
             listener.exitResourceList(this);
        }
    }
}


export class ResourceRefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.IDENTIFIER);
    	} else {
    		return this.getToken(RPLParser.IDENTIFIER, i);
    	}
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.DOT);
    	} else {
    		return this.getToken(RPLParser.DOT, i);
    	}
    }
    public STAR(): antlr.TerminalNode[];
    public STAR(i: number): antlr.TerminalNode | null;
    public STAR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.STAR);
    	} else {
    		return this.getToken(RPLParser.STAR, i);
    	}
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_resourceRef;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterResourceRef) {
             listener.enterResourceRef(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitResourceRef) {
             listener.exitResourceRef(this);
        }
    }
}


export class GroupDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public GROUP(): antlr.TerminalNode {
        return this.getToken(RPLParser.GROUP, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RPLParser.IDENTIFIER, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACE, 0)!;
    }
    public groupBody(): GroupBodyContext {
        return this.getRuleContext(0, GroupBodyContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACE, 0)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_groupDeclaration;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterGroupDeclaration) {
             listener.enterGroupDeclaration(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitGroupDeclaration) {
             listener.exitGroupDeclaration(this);
        }
    }
}


export class GroupBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public groupMembers(): GroupMembersContext | null {
        return this.getRuleContext(0, GroupMembersContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.COMMA, 0);
    }
    public groupRoles(): GroupRolesContext | null {
        return this.getRuleContext(0, GroupRolesContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_groupBody;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterGroupBody) {
             listener.enterGroupBody(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitGroupBody) {
             listener.exitGroupBody(this);
        }
    }
}


export class GroupMembersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MEMBERS(): antlr.TerminalNode {
        return this.getToken(RPLParser.MEMBERS, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(RPLParser.COLON, 0)!;
    }
    public LBRACKET(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACKET, 0)!;
    }
    public memberList(): MemberListContext {
        return this.getRuleContext(0, MemberListContext)!;
    }
    public RBRACKET(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACKET, 0)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_groupMembers;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterGroupMembers) {
             listener.enterGroupMembers(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitGroupMembers) {
             listener.exitGroupMembers(this);
        }
    }
}


export class MemberListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.IDENTIFIER);
    	} else {
    		return this.getToken(RPLParser.IDENTIFIER, i);
    	}
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_memberList;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterMemberList) {
             listener.enterMemberList(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitMemberList) {
             listener.exitMemberList(this);
        }
    }
}


export class GroupRolesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ROLE(): antlr.TerminalNode {
        return this.getToken(RPLParser.ROLE, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(RPLParser.COLON, 0)!;
    }
    public LBRACKET(): antlr.TerminalNode {
        return this.getToken(RPLParser.LBRACKET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.IDENTIFIER);
    	} else {
    		return this.getToken(RPLParser.IDENTIFIER, i);
    	}
    }
    public RBRACKET(): antlr.TerminalNode {
        return this.getToken(RPLParser.RBRACKET, 0)!;
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_groupRoles;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterGroupRoles) {
             listener.enterGroupRoles(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitGroupRoles) {
             listener.exitGroupRoles(this);
        }
    }
}


export class ActionListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public permission(): PermissionContext[];
    public permission(i: number): PermissionContext | null;
    public permission(i?: number): PermissionContext[] | PermissionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PermissionContext);
        }

        return this.getRuleContext(i, PermissionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_actionList;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterActionList) {
             listener.enterActionList(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitActionList) {
             listener.exitActionList(this);
        }
    }
}


export class PermissionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public READ(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.READ, 0);
    }
    public WRITE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.WRITE, 0);
    }
    public MODIFY(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.MODIFY, 0);
    }
    public START(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.START, 0);
    }
    public STOP(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.STOP, 0);
    }
    public DEPLOY(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.DEPLOY, 0);
    }
    public DELETE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.DELETE, 0);
    }
    public EXECUTE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.EXECUTE, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.STAR, 0);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_permission;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterPermission) {
             listener.enterPermission(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitPermission) {
             listener.exitPermission(this);
        }
    }
}


export class ConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public orCondition(): OrConditionContext {
        return this.getRuleContext(0, OrConditionContext)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_condition;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterCondition) {
             listener.enterCondition(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitCondition) {
             listener.exitCondition(this);
        }
    }
}


export class OrConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public andCondition(): AndConditionContext[];
    public andCondition(i: number): AndConditionContext | null;
    public andCondition(i?: number): AndConditionContext[] | AndConditionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AndConditionContext);
        }

        return this.getRuleContext(i, AndConditionContext);
    }
    public OR(): antlr.TerminalNode[];
    public OR(i: number): antlr.TerminalNode | null;
    public OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.OR);
    	} else {
    		return this.getToken(RPLParser.OR, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_orCondition;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterOrCondition) {
             listener.enterOrCondition(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitOrCondition) {
             listener.exitOrCondition(this);
        }
    }
}


export class AndConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public notCondition(): NotConditionContext[];
    public notCondition(i: number): NotConditionContext | null;
    public notCondition(i?: number): NotConditionContext[] | NotConditionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(NotConditionContext);
        }

        return this.getRuleContext(i, NotConditionContext);
    }
    public AND(): antlr.TerminalNode[];
    public AND(i: number): antlr.TerminalNode | null;
    public AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.AND);
    	} else {
    		return this.getToken(RPLParser.AND, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_andCondition;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterAndCondition) {
             listener.enterAndCondition(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitAndCondition) {
             listener.exitAndCondition(this);
        }
    }
}


export class NotConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.NOT, 0);
    }
    public notCondition(): NotConditionContext | null {
        return this.getRuleContext(0, NotConditionContext);
    }
    public primaryCondition(): PrimaryConditionContext | null {
        return this.getRuleContext(0, PrimaryConditionContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_notCondition;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterNotCondition) {
             listener.enterNotCondition(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitNotCondition) {
             listener.exitNotCondition(this);
        }
    }
}


export class PrimaryConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.LPAREN, 0);
    }
    public condition(): ConditionContext | null {
        return this.getRuleContext(0, ConditionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.RPAREN, 0);
    }
    public comparison(): ComparisonContext | null {
        return this.getRuleContext(0, ComparisonContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_primaryCondition;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterPrimaryCondition) {
             listener.enterPrimaryCondition(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitPrimaryCondition) {
             listener.exitPrimaryCondition(this);
        }
    }
}


export class ComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public comparisonOp(): ComparisonOpContext | null {
        return this.getRuleContext(0, ComparisonOpContext);
    }
    public IN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.IN, 0);
    }
    public LBRACKET(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.LBRACKET, 0);
    }
    public valueList(): ValueListContext | null {
        return this.getRuleContext(0, ValueListContext);
    }
    public RBRACKET(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.RBRACKET, 0);
    }
    public CONTAINS(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.CONTAINS, 0);
    }
    public value(): ValueContext | null {
        return this.getRuleContext(0, ValueContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_comparison;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterComparison) {
             listener.enterComparison(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitComparison) {
             listener.exitComparison(this);
        }
    }
}


export class ComparisonOpContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.EQ, 0);
    }
    public NE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.NE, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.GT, 0);
    }
    public LE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.LE, 0);
    }
    public GE(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.GE, 0);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_comparisonOp;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterComparisonOp) {
             listener.enterComparisonOp(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitComparisonOp) {
             listener.exitComparisonOp(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public additiveExpr(): AdditiveExprContext {
        return this.getRuleContext(0, AdditiveExprContext)!;
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_expression;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
}


export class AdditiveExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public multiplicativeExpr(): MultiplicativeExprContext[];
    public multiplicativeExpr(i: number): MultiplicativeExprContext | null;
    public multiplicativeExpr(i?: number): MultiplicativeExprContext[] | MultiplicativeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MultiplicativeExprContext);
        }

        return this.getRuleContext(i, MultiplicativeExprContext);
    }
    public PLUS(): antlr.TerminalNode[];
    public PLUS(i: number): antlr.TerminalNode | null;
    public PLUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.PLUS);
    	} else {
    		return this.getToken(RPLParser.PLUS, i);
    	}
    }
    public MINUS(): antlr.TerminalNode[];
    public MINUS(i: number): antlr.TerminalNode | null;
    public MINUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.MINUS);
    	} else {
    		return this.getToken(RPLParser.MINUS, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_additiveExpr;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterAdditiveExpr) {
             listener.enterAdditiveExpr(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitAdditiveExpr) {
             listener.exitAdditiveExpr(this);
        }
    }
}


export class MultiplicativeExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unaryExpr(): UnaryExprContext[];
    public unaryExpr(i: number): UnaryExprContext | null;
    public unaryExpr(i?: number): UnaryExprContext[] | UnaryExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UnaryExprContext);
        }

        return this.getRuleContext(i, UnaryExprContext);
    }
    public STAR(): antlr.TerminalNode[];
    public STAR(i: number): antlr.TerminalNode | null;
    public STAR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.STAR);
    	} else {
    		return this.getToken(RPLParser.STAR, i);
    	}
    }
    public DIV(): antlr.TerminalNode[];
    public DIV(i: number): antlr.TerminalNode | null;
    public DIV(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.DIV);
    	} else {
    		return this.getToken(RPLParser.DIV, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_multiplicativeExpr;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterMultiplicativeExpr) {
             listener.enterMultiplicativeExpr(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitMultiplicativeExpr) {
             listener.exitMultiplicativeExpr(this);
        }
    }
}


export class UnaryExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.PLUS, 0);
    }
    public unaryExpr(): UnaryExprContext | null {
        return this.getRuleContext(0, UnaryExprContext);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.MINUS, 0);
    }
    public primaryExpr(): PrimaryExprContext | null {
        return this.getRuleContext(0, PrimaryExprContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_unaryExpr;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterUnaryExpr) {
             listener.enterUnaryExpr(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitUnaryExpr) {
             listener.exitUnaryExpr(this);
        }
    }
}


export class PrimaryExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.LPAREN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.RPAREN, 0);
    }
    public atom(): AtomContext | null {
        return this.getRuleContext(0, AtomContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_primaryExpr;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterPrimaryExpr) {
             listener.enterPrimaryExpr(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitPrimaryExpr) {
             listener.exitPrimaryExpr(this);
        }
    }
}


export class AtomContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INTEGER(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.INTEGER, 0);
    }
    public REAL(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.REAL, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.BOOLEAN, 0);
    }
    public qualifiedName(): QualifiedNameContext | null {
        return this.getRuleContext(0, QualifiedNameContext);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_atom;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterAtom) {
             listener.enterAtom(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitAtom) {
             listener.exitAtom(this);
        }
    }
}


export class QualifiedNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.IDENTIFIER);
    	} else {
    		return this.getToken(RPLParser.IDENTIFIER, i);
    	}
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.DOT);
    	} else {
    		return this.getToken(RPLParser.DOT, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_qualifiedName;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterQualifiedName) {
             listener.enterQualifiedName(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitQualifiedName) {
             listener.exitQualifiedName(this);
        }
    }
}


export class ValueContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.STRING, 0);
    }
    public CHARACTER(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.CHARACTER, 0);
    }
    public INTEGER(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.INTEGER, 0);
    }
    public REAL(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.REAL, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.IDENTIFIER, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.BOOLEAN, 0);
    }
    public LBRACKET(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.LBRACKET, 0);
    }
    public valueList(): ValueListContext | null {
        return this.getRuleContext(0, ValueListContext);
    }
    public RBRACKET(): antlr.TerminalNode | null {
        return this.getToken(RPLParser.RBRACKET, 0);
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_value;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterValue) {
             listener.enterValue(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitValue) {
             listener.exitValue(this);
        }
    }
}


export class ValueListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public value(): ValueContext[];
    public value(i: number): ValueContext | null;
    public value(i?: number): ValueContext[] | ValueContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ValueContext);
        }

        return this.getRuleContext(i, ValueContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RPLParser.COMMA);
    	} else {
    		return this.getToken(RPLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return RPLParser.RULE_valueList;
    }
    public override enterRule(listener: RPLParserListener): void {
        if(listener.enterValueList) {
             listener.enterValueList(this);
        }
    }
    public override exitRule(listener: RPLParserListener): void {
        if(listener.exitValueList) {
             listener.exitValueList(this);
        }
    }
}
