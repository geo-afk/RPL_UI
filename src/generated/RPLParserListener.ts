
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgramContext } from "./RPLParser.js";
import { StatementContext } from "./RPLParser.js";
import { RoleDeclarationContext } from "./RPLParser.js";
import { RoleBodyContext } from "./RPLParser.js";
import { RolePermissionsContext } from "./RPLParser.js";
import { PermissionBlockContext } from "./RPLParser.js";
import { UserDeclarationContext } from "./RPLParser.js";
import { UserBodyContext } from "./RPLParser.js";
import { ValidPeriodContext } from "./RPLParser.js";
import { UserRolesContext } from "./RPLParser.js";
import { ValidFromContext } from "./RPLParser.js";
import { ValidUntilContext } from "./RPLParser.js";
import { ResourceDeclarationContext } from "./RPLParser.js";
import { ResourceBodyContext } from "./RPLParser.js";
import { ResourcePropertyContext } from "./RPLParser.js";
import { ResourceTypeContext } from "./RPLParser.js";
import { MetadataBlockContext } from "./RPLParser.js";
import { MetadataEntryContext } from "./RPLParser.js";
import { ResourceListContext } from "./RPLParser.js";
import { ResourceRefContext } from "./RPLParser.js";
import { GroupDeclarationContext } from "./RPLParser.js";
import { GroupBodyContext } from "./RPLParser.js";
import { GroupMembersContext } from "./RPLParser.js";
import { MemberListContext } from "./RPLParser.js";
import { GroupRolesContext } from "./RPLParser.js";
import { ActionListContext } from "./RPLParser.js";
import { PermissionContext } from "./RPLParser.js";
import { ConditionContext } from "./RPLParser.js";
import { OrConditionContext } from "./RPLParser.js";
import { AndConditionContext } from "./RPLParser.js";
import { NotConditionContext } from "./RPLParser.js";
import { PrimaryConditionContext } from "./RPLParser.js";
import { ComparisonContext } from "./RPLParser.js";
import { ComparisonOpContext } from "./RPLParser.js";
import { ExpressionContext } from "./RPLParser.js";
import { AdditiveExprContext } from "./RPLParser.js";
import { MultiplicativeExprContext } from "./RPLParser.js";
import { UnaryExprContext } from "./RPLParser.js";
import { PrimaryExprContext } from "./RPLParser.js";
import { AtomContext } from "./RPLParser.js";
import { QualifiedNameContext } from "./RPLParser.js";
import { ValueContext } from "./RPLParser.js";
import { ValueListContext } from "./RPLParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `RPLParser`.
 */
export class RPLParserListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `RPLParser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.roleDeclaration`.
     * @param ctx the parse tree
     */
    enterRoleDeclaration?: (ctx: RoleDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.roleDeclaration`.
     * @param ctx the parse tree
     */
    exitRoleDeclaration?: (ctx: RoleDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.roleBody`.
     * @param ctx the parse tree
     */
    enterRoleBody?: (ctx: RoleBodyContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.roleBody`.
     * @param ctx the parse tree
     */
    exitRoleBody?: (ctx: RoleBodyContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.rolePermissions`.
     * @param ctx the parse tree
     */
    enterRolePermissions?: (ctx: RolePermissionsContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.rolePermissions`.
     * @param ctx the parse tree
     */
    exitRolePermissions?: (ctx: RolePermissionsContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.permissionBlock`.
     * @param ctx the parse tree
     */
    enterPermissionBlock?: (ctx: PermissionBlockContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.permissionBlock`.
     * @param ctx the parse tree
     */
    exitPermissionBlock?: (ctx: PermissionBlockContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.userDeclaration`.
     * @param ctx the parse tree
     */
    enterUserDeclaration?: (ctx: UserDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.userDeclaration`.
     * @param ctx the parse tree
     */
    exitUserDeclaration?: (ctx: UserDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.userBody`.
     * @param ctx the parse tree
     */
    enterUserBody?: (ctx: UserBodyContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.userBody`.
     * @param ctx the parse tree
     */
    exitUserBody?: (ctx: UserBodyContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.validPeriod`.
     * @param ctx the parse tree
     */
    enterValidPeriod?: (ctx: ValidPeriodContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.validPeriod`.
     * @param ctx the parse tree
     */
    exitValidPeriod?: (ctx: ValidPeriodContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.userRoles`.
     * @param ctx the parse tree
     */
    enterUserRoles?: (ctx: UserRolesContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.userRoles`.
     * @param ctx the parse tree
     */
    exitUserRoles?: (ctx: UserRolesContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.validFrom`.
     * @param ctx the parse tree
     */
    enterValidFrom?: (ctx: ValidFromContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.validFrom`.
     * @param ctx the parse tree
     */
    exitValidFrom?: (ctx: ValidFromContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.validUntil`.
     * @param ctx the parse tree
     */
    enterValidUntil?: (ctx: ValidUntilContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.validUntil`.
     * @param ctx the parse tree
     */
    exitValidUntil?: (ctx: ValidUntilContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.resourceDeclaration`.
     * @param ctx the parse tree
     */
    enterResourceDeclaration?: (ctx: ResourceDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.resourceDeclaration`.
     * @param ctx the parse tree
     */
    exitResourceDeclaration?: (ctx: ResourceDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.resourceBody`.
     * @param ctx the parse tree
     */
    enterResourceBody?: (ctx: ResourceBodyContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.resourceBody`.
     * @param ctx the parse tree
     */
    exitResourceBody?: (ctx: ResourceBodyContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.resourceProperty`.
     * @param ctx the parse tree
     */
    enterResourceProperty?: (ctx: ResourcePropertyContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.resourceProperty`.
     * @param ctx the parse tree
     */
    exitResourceProperty?: (ctx: ResourcePropertyContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.resourceType`.
     * @param ctx the parse tree
     */
    enterResourceType?: (ctx: ResourceTypeContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.resourceType`.
     * @param ctx the parse tree
     */
    exitResourceType?: (ctx: ResourceTypeContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.metadataBlock`.
     * @param ctx the parse tree
     */
    enterMetadataBlock?: (ctx: MetadataBlockContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.metadataBlock`.
     * @param ctx the parse tree
     */
    exitMetadataBlock?: (ctx: MetadataBlockContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.metadataEntry`.
     * @param ctx the parse tree
     */
    enterMetadataEntry?: (ctx: MetadataEntryContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.metadataEntry`.
     * @param ctx the parse tree
     */
    exitMetadataEntry?: (ctx: MetadataEntryContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.resourceList`.
     * @param ctx the parse tree
     */
    enterResourceList?: (ctx: ResourceListContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.resourceList`.
     * @param ctx the parse tree
     */
    exitResourceList?: (ctx: ResourceListContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.resourceRef`.
     * @param ctx the parse tree
     */
    enterResourceRef?: (ctx: ResourceRefContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.resourceRef`.
     * @param ctx the parse tree
     */
    exitResourceRef?: (ctx: ResourceRefContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.groupDeclaration`.
     * @param ctx the parse tree
     */
    enterGroupDeclaration?: (ctx: GroupDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.groupDeclaration`.
     * @param ctx the parse tree
     */
    exitGroupDeclaration?: (ctx: GroupDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.groupBody`.
     * @param ctx the parse tree
     */
    enterGroupBody?: (ctx: GroupBodyContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.groupBody`.
     * @param ctx the parse tree
     */
    exitGroupBody?: (ctx: GroupBodyContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.groupMembers`.
     * @param ctx the parse tree
     */
    enterGroupMembers?: (ctx: GroupMembersContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.groupMembers`.
     * @param ctx the parse tree
     */
    exitGroupMembers?: (ctx: GroupMembersContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.memberList`.
     * @param ctx the parse tree
     */
    enterMemberList?: (ctx: MemberListContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.memberList`.
     * @param ctx the parse tree
     */
    exitMemberList?: (ctx: MemberListContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.groupRoles`.
     * @param ctx the parse tree
     */
    enterGroupRoles?: (ctx: GroupRolesContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.groupRoles`.
     * @param ctx the parse tree
     */
    exitGroupRoles?: (ctx: GroupRolesContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.actionList`.
     * @param ctx the parse tree
     */
    enterActionList?: (ctx: ActionListContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.actionList`.
     * @param ctx the parse tree
     */
    exitActionList?: (ctx: ActionListContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.permission`.
     * @param ctx the parse tree
     */
    enterPermission?: (ctx: PermissionContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.permission`.
     * @param ctx the parse tree
     */
    exitPermission?: (ctx: PermissionContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.condition`.
     * @param ctx the parse tree
     */
    enterCondition?: (ctx: ConditionContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.condition`.
     * @param ctx the parse tree
     */
    exitCondition?: (ctx: ConditionContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.orCondition`.
     * @param ctx the parse tree
     */
    enterOrCondition?: (ctx: OrConditionContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.orCondition`.
     * @param ctx the parse tree
     */
    exitOrCondition?: (ctx: OrConditionContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.andCondition`.
     * @param ctx the parse tree
     */
    enterAndCondition?: (ctx: AndConditionContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.andCondition`.
     * @param ctx the parse tree
     */
    exitAndCondition?: (ctx: AndConditionContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.notCondition`.
     * @param ctx the parse tree
     */
    enterNotCondition?: (ctx: NotConditionContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.notCondition`.
     * @param ctx the parse tree
     */
    exitNotCondition?: (ctx: NotConditionContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.primaryCondition`.
     * @param ctx the parse tree
     */
    enterPrimaryCondition?: (ctx: PrimaryConditionContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.primaryCondition`.
     * @param ctx the parse tree
     */
    exitPrimaryCondition?: (ctx: PrimaryConditionContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.comparison`.
     * @param ctx the parse tree
     */
    enterComparison?: (ctx: ComparisonContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.comparison`.
     * @param ctx the parse tree
     */
    exitComparison?: (ctx: ComparisonContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.comparisonOp`.
     * @param ctx the parse tree
     */
    enterComparisonOp?: (ctx: ComparisonOpContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.comparisonOp`.
     * @param ctx the parse tree
     */
    exitComparisonOp?: (ctx: ComparisonOpContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.additiveExpr`.
     * @param ctx the parse tree
     */
    enterAdditiveExpr?: (ctx: AdditiveExprContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.additiveExpr`.
     * @param ctx the parse tree
     */
    exitAdditiveExpr?: (ctx: AdditiveExprContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.multiplicativeExpr`.
     * @param ctx the parse tree
     */
    enterMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.multiplicativeExpr`.
     * @param ctx the parse tree
     */
    exitMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.unaryExpr`.
     * @param ctx the parse tree
     */
    enterUnaryExpr?: (ctx: UnaryExprContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.unaryExpr`.
     * @param ctx the parse tree
     */
    exitUnaryExpr?: (ctx: UnaryExprContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.primaryExpr`.
     * @param ctx the parse tree
     */
    enterPrimaryExpr?: (ctx: PrimaryExprContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.primaryExpr`.
     * @param ctx the parse tree
     */
    exitPrimaryExpr?: (ctx: PrimaryExprContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.atom`.
     * @param ctx the parse tree
     */
    enterAtom?: (ctx: AtomContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.atom`.
     * @param ctx the parse tree
     */
    exitAtom?: (ctx: AtomContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.qualifiedName`.
     * @param ctx the parse tree
     */
    enterQualifiedName?: (ctx: QualifiedNameContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.qualifiedName`.
     * @param ctx the parse tree
     */
    exitQualifiedName?: (ctx: QualifiedNameContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.value`.
     * @param ctx the parse tree
     */
    enterValue?: (ctx: ValueContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.value`.
     * @param ctx the parse tree
     */
    exitValue?: (ctx: ValueContext) => void;
    /**
     * Enter a parse tree produced by `RPLParser.valueList`.
     * @param ctx the parse tree
     */
    enterValueList?: (ctx: ValueListContext) => void;
    /**
     * Exit a parse tree produced by `RPLParser.valueList`.
     * @param ctx the parse tree
     */
    exitValueList?: (ctx: ValueListContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

